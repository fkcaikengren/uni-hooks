import type { ComputedRef, Ref, WatchSource } from 'vue'
import { useRequest } from '@caikengren/uni-use-request'
import { computed, readonly, ref, shallowReadonly, watch } from 'vue'

// TODO: 需要优化
// 自定义Toast组件
interface ToastOptions {
  message: string
  forbidClick?: boolean
}

let toastInstance: any = null

const Toast = {
  showLoading(options: ToastOptions) {
    // 简单的加载提示实现
    if (typeof uni !== 'undefined' && uni.showLoading) {
      uni.showLoading({
        title: options.message,
        mask: options.forbidClick || false,
      })
    }
    else {
      // 浏览器环境下的简单实现
      console.log(`Loading: ${options.message}`)
      toastInstance = setTimeout(() => {
        // 模拟加载状态
      }, 0)
    }
  },

  dismissLoading() {
    if (typeof uni !== 'undefined' && uni.hideLoading) {
      uni.hideLoading()
    }
    else {
      // 浏览器环境下清除定时器
      if (toastInstance) {
        clearTimeout(toastInstance)
        toastInstance = null
      }
    }
  },
}

/**
 * DependencyList 依赖数组
 */
export type DependencyList = WatchSource | any[] | any

/**
 * UseListData 列表数据
 */
export type UseListData = Record<string, any>

/**
 * UseListService
 */
export type UseListService<TData extends UseListData> = (
  currentData?: TData,
) => Promise<TData>

/**
 * UseListOptions
 */
export interface UseListOptions<TData> {
  /**
   * 自定义判断是否还有更多数据
   */
  hasMore?: (data?: TData) => boolean
  /**
   * 是否显示加载提示
   * @default false
   */
  showLoadingToast?: boolean
  /**
   * 加载提示的文本
   * @default "加载中"
   */
  loadingToastMessage?: string
  /**
   * 是否在初始化的时手动触发service请求。
   * true 则需要手动调用 `run` 或 `runAsync` 触发执行，false 则在初始化时自动触发service请求
   * @default true
   */
  manual?: boolean

  /**
   * 依赖数组，当依赖变化时自动重新加载数据
   */
  reloadDeps?: DependencyList

  /**
   * 映射列表数据的字段
   */
  listField?: string
  /**
   * 映射是否无更多数据的字段
   */
  isEndField?: string
  /**
   * Triggered before service execution
   */
  onBefore?: () => void

  /**
   * Triggered when service resolve
   */
  onSuccess?: (data: TData) => void

  /**
   * Triggered when service reject
   */
  onError?: (e: Error) => void

  /**
   * Triggered when service execution is complete
   */
  onFinally?: (data?: TData, e?: Error) => void
}

/**
 * useList返回值
 */
export interface UseListReturn<TData extends UseListData> {
  /**
   * 带有列表数据的结果
   */
  data: Readonly<Ref<TData | undefined>>

  /**
   * 加载第一页数据中
   */
  loading: Readonly<Ref<boolean>>

  /**
   * 加载更多数据中
   */
  loadingMore: Readonly<Ref<boolean>>

  /**
   * 是否还有更多数据，true表示无更多分页数据
   */
  isEnd: ComputedRef<boolean>

  /**
   * 加载更多数据，自动捕获错误，通过`options.onError`处理
   */
  loadMore: () => void

  /**
   * 加载更多数据，需要手动处理错误
   */
  loadMoreAsync: () => Promise<TData | undefined>

  /**
   * 加载第一页的数据，自动捕获错误，通过`options.onError`处理
   */
  reload: () => void

  /**
   * 加载第一页的数据，需要手动处理错误
   */
  reloadAsync: () => Promise<TData>

  /**
   * 取消当前Promise
   */
  cancel: () => void

  /**
   * 修改数据
   */
  mutate: (data?: TData) => void
}

/**
 * 列表数据管理 Hook，支持分页加载更多、刷新等功能
 * @param service 获取列表数据的服务函数
 * @param [options] 配置选项
 * @returns 列表数据管理对象
 *
 * @example
 *
 * import { useList } from '@caikengren/uni-hooks';
 *
 * const {
 *   data,
 *   loading,
 *   loadingMore,
 *   isEnd,
 *   loadMore,
 *   reload
 * } = useList(
 *   async (lastData) => {
 *     // 获取列表数据的服务函数
 *     const res = await api.getList({
 *       page: lastData ? lastData.page + 1 : 1,
 *       pageSize: 10
 *     });
 *     return {
 *       list: res.data.list,
 *       page: res.data.page,
 *       is_end: res.data.page >= res.data.total_page
 *     };
 *   },
 *   {
 *     manual: false, // 自动加载第一页
 *     showLoadingToast: true,
 *     onSuccess: (data) => {
 *       console.log('加载成功', data);
 *     }
 *   }
 * );
 */
export function useList<TData extends UseListData>(service: UseListService<TData>, options: UseListOptions<TData> = {}): UseListReturn<TData> {
  const {
    hasMore,
    showLoadingToast = false,
    loadingToastMessage = '加载中',
    manual = true,
    onBefore,
    onSuccess,
    onError,
    onFinally,
    reloadDeps = [],
  } = options

  const listField = options.listField || 'list'
  const isEndField = options.isEndField || 'is_end'

  const finalData = ref<TData>()
  const loadingMore = ref<boolean>(false)

  const setFinalData = (mutateData: TData | undefined) => {
    finalData.value = mutateData
  }

  const isEnd = computed<boolean>(() => {
    if (typeof hasMore === 'function') {
      return !hasMore(finalData.value)
    }
    return finalData.value?.[isEndField] || false
  })

  const { loading, run, runAsync, cancel } = useRequest(
    async (lastData?: TData) => {
      try {
        showLoadingToast && Toast.showLoading({ message: loadingToastMessage, forbidClick: true })
        const resp = await service(lastData)
        const list = resp[listField] || []
        finalData.value = {
          ...resp,
          [listField]: lastData && lastData[listField]?.length > 0 ? lastData[listField].concat(list) : list,
        }
        return resp
      }
      finally {
        showLoadingToast && Toast.dismissLoading()
      }
    },
    {
      manual,
      onFinally: (_, d, e) => {
        loadingMore.value = false
        showLoadingToast && Toast.dismissLoading()
        onFinally?.(d, e)
      },
      onBefore: () => onBefore?.(),
      onSuccess: (d) => {
        onSuccess?.(d)
      },
      onError: e => onError?.(e),
    },
  )

  // 加载下一页
  const loadMore = () => {
    if (isEnd.value || !finalData.value)
      return
    loadingMore.value = true
    run(finalData.value)
  }

  // 加载下一页
  const loadMoreAsync = () => {
    if (isEnd.value || !finalData.value)
      return Promise.resolve(undefined)
    loadingMore.value = true
    return runAsync(finalData.value)
  }

  // 刷新
  const reload = () => run()
  // 刷新
  const reloadAsync = () => runAsync()

  watch(reloadDeps, () => {
    run()
  }, reloadDeps)

  const _loading = computed(() => !loadingMore.value && loading.value)

  return {
    data: shallowReadonly(finalData),
    loading: readonly(_loading),
    loadingMore: readonly(loadingMore),
    isEnd,
    loadMore,
    loadMoreAsync,
    reload,
    reloadAsync,
    mutate: setFinalData,
    cancel,
  }
}
