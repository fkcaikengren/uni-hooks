import type { ConfigurableEventFilter, ConfigurableFlush, RemovableRef, WatchPausableReturn } from '@caikengren/uni-hooks-shared'
import type { MaybeRefOrGetter, Ref } from 'vue'
import { isNil, tryOnMounted, tryOnScopeDispose, watchPausable } from '@caikengren/uni-hooks-shared'
import { ref, shallowRef, toValue } from 'vue'
import { useUniInterceptor } from '../useUniInterceptor'

export type UniStorageLike = Pick<Uni, 'getStorage' | 'setStorage' | 'removeStorage'>

const asyncStorage: UniStorageLike = {
  getStorage: uni.getStorage,
  setStorage: uni.setStorage,
  removeStorage: uni.removeStorage,
}

export interface Serializer<T> {
  read: (raw: string) => T
  write: (value: T) => string
}

export type DataType = string | number | boolean | object | null | undefined

export function guessSerializerType<T extends DataType>(raw: T) {
  if (isNil(raw)) {
    return 'any'
  } if (raw instanceof Set) {
    return 'set'
  } if (raw instanceof Map) {
    return 'map'
  } if (raw instanceof Date) {
    return 'date'
  } if (typeof raw === 'boolean') {
    return 'boolean'
  } if (typeof raw === 'string') {
    return 'string'
  } if (typeof raw === 'object') {
    return 'object'
  } if (Number.isNaN(raw)) {
    return 'any'
  }
  return 'number'
}

const StorageSerializers: Record<
'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date',
Serializer<any>
> = {
  boolean: {
    read: (v: any) => v === 'true',
    write: String,
  },
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v),
  },
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: String,
  },
  any: {
    read: (v: any) => v,
    write: String,
  },
  string: {
    read: (v: any) => v,
    write: String,
  },
  map: {
    read: (v: any) => new Map(JSON.parse(v)),
    write: (v: any) => JSON.stringify([...(v as Map<any, any>).entries()]),
  },
  set: {
    read: (v: any) => new Set(JSON.parse(v)),
    write: (v: any) => JSON.stringify([...(v as Set<any>)]),
  },
  date: {
    read: (v: any) => new Date(v),
    write: (v: any) => v.toISOString(),
  },
}

interface Data<T> extends Ref<T> {
  key: string
  type: 'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date'
  isUpdating: boolean
  serializer: Serializer<T>
  default: T
  /** 写入 storage 的 timer */
  timer: NodeJS.Timeout
  /** data 修改监听器 */
  watch: WatchPausableReturn
  read: () => T
  write: (val: T) => void
  /** 根据 storage 的值，刷新变量。 */
  refresh: () => Data<T>
  /** 将变量的值写入 storage */
  sync: () => void
  /** 清除写入操作的timer */
  clearTimer: () => void
  /** 使用 raw 值更新 data */
  updateByRaw: (raw: string | null | undefined) => void
}

const store: Record<string, Data<any>> = {}

export interface UseStorageOptions<T> extends ConfigurableEventFilter, ConfigurableFlush {
  /**
   * 是否监听深层变化
   *
   * @default true
   */
  deep?: boolean
  /**
   * 是否监听 setStorage、removeStorage 和 clearStorage 引起的本地缓存变化
   *
   * @default true
   */
  listenToStorageChanges?: boolean
  /**
   * 当本地缓存不存在时，是否把默认值写入缓存
   *
   * @deprecated 变量ref和storage是响应式的，当storage没值，返回带默认值的ref必然会写入storage
   * @default true
   */
  writeDefaults?: boolean
  /**
   * 是否合并默认值和本地缓存值
   *
   * 当设置为 true 时，浅合并对象
   *
   * 你也可以传一个方法来自定义合并
   *
   * @default false
   */
  mergeDefaults?: boolean | ((storageValue: T, defaults: T) => T)
  /** 自定义数据序列化 */
  serializer?: Serializer<T>
  /**
   * 错误回调
   *
   * 默认用 `console.error` 打印错误
   */
  onError?: (error: unknown) => void
  /**
   * 是否使用 shallowRef
   *
   * @default false
   */
  shallow?: boolean
  /**
   * Wait for the component to be mounted before reading the storage.
   *
   * @default false
   */
  initOnMounted?: boolean
  /**
   * 自定义存储实现
   * @default uni
   */
  storage?: UniStorageLike
}

export function useStorage<T = unknown>(
  key: string,
  initialValue?: MaybeRefOrGetter<null>,
  options?: UseStorageOptions<T>,
): RemovableRef<T>

export function useStorage<T>(
  key: string,
  initialValue: MaybeRefOrGetter<T>,
  options?: UseStorageOptions<T>,
): RemovableRef<T>

/**
 * 响应式的本地缓存hook（异步），支持小程序和H5环境
 * 参考实现 https://github.com/uni-helper/uni-use
 * @function useStorage
 * @param {string} key - 存储的键名
 * @param {T} [initialValue] - 初始值，可以是ref、getter或普通值
 * @param {object} [options] - 配置选项
 * @param {'pre'|'post'|'sync'} [options.flush] - 控制何时将值写入存储
 * @param {boolean} [options.deep] - 是否深度监听对象变化
 * @param {boolean} [options.listenToStorageChanges] - 是否监听外部存储变化
 * @param {boolean|Function} [options.mergeDefaults] - 是否/如何合并默认值和存储值
 * @param {boolean} [options.shallow] - 是否使用shallowRef
 * @param {Function} [options.onError] - 错误回调函数
 * @param {boolean} [options.initOnMounted] - 是否在组件挂载后读取存储
 * @returns {RemovableRef<T>} 响应式的存储数据
 *
 * @example
 * // 基本用法
 * const data = useStorage('key', 'defaultValue');
 *
 * // 使用配置选项, 如果key对应的缓存不存在, 会写入默认值
 * const data = useStorage('key', { foo: 'bar' }, {
 *   deep: true,
 *   mergeDefaults: true
 * });
 *
 * // 修改data会同时将数据写入缓存
 * data.value = { foo: 'baz' };
 */
export function useStorage<T extends DataType>(
  key: string,
  initialValue?: MaybeRefOrGetter<T>,
  options: UseStorageOptions<T> = {},
): RemovableRef<T> {
  const {
    flush = 'pre',
    deep = true,
    listenToStorageChanges = true,
    mergeDefaults = false,
    shallow = false,
    eventFilter,
    onError = error => console.error(error),
    initOnMounted,
    storage = asyncStorage,
  } = options

  const rawInit = toValue(initialValue) as T

  const type = guessSerializerType<T>(rawInit)

  const hasStore = !!store[key]

  const data = hasStore ? store[key] : (shallow ? shallowRef : ref)(rawInit) as Ref<T> as Data<T>

  const serializer = options.serializer ?? StorageSerializers[type]

  data.key = key
  data.type = type
  data.serializer = serializer
  data.isUpdating = false
  data.default = rawInit
  data.read = readStorage
  data.write = writeStorageImmediately
  data.refresh = () => {
    data.read()
    return data
  }
  data.sync = () => data.write(data.value)
  data.clearTimer = clearTimer
  data.updateByRaw = updateByRaw

  store[key] = data // 重新映射

  if (hasStore) {
    // 不重复读数据
    return data
  }

  if (initOnMounted) {
    tryOnMounted(data.read)
  }
  else {
    data.read()
  }

  // 监听数据变化，修改存储
  data.watch = watchPausable(data, () => !data.isUpdating && writeStorage(data.value), { flush, deep, eventFilter })

  if (listenToStorageChanges) {
    listenDataChange(data)
  }

  tryOnScopeDispose(clearTimer)

  function clearTimer() {
    data.timer && clearTimeout(data.timer)
  }

  function writeStorage(val: T) {
    clearTimer()
    // 如果是同步操作，则直接写 storage
    if (flush === 'sync') {
      writeStorageImmediately(val)
      return
    }

    data.timer = setTimeout(() => writeStorageImmediately(val), 100)
  }

  function writeStorageImmediately(val: T) {
    clearTimer()

    if (data.isUpdating) {
      return
    }

    try {
      data.isUpdating = true

      if (isNil(val)) {
        storage.removeStorage({
          key,
          fail: error => onError(error),
        })
        clearTimer()
        return
      }
      const serialized = data.serializer.write(val)
      storage.setStorage({
        key,
        data: serialized,
        fail: error => onError(error),
      })
    }
    catch (error) {
      onError(error)
    }
    finally {
      data.isUpdating = false
    }
  }

  function updateByRaw(raw: string | null | undefined) {
    try {
      if (isNil(raw)) {
        // 没有对应的值，直接使用默认值
        data.value = data.default
        return
      }

      // 解析 value
      const value: T = data.serializer.read(raw)

      if (mergeDefaults) {
        // 如果是方法，调用
        if (typeof mergeDefaults === 'function') {
          data.value = mergeDefaults(value, data.default)
          return
        }

        // 如果是对象，浅合并
        if (type === 'object' && !Array.isArray(value)) {
          data.value = { ...(data.default as any), ...(value as any) }
          return
        }
      }

      // 有对应的值，不需要合并
      data.value = value
    }
    catch (err: any) {
      onError(err)
    }
  }

  function readStorage() {
    // 读取本地缓存值
    storage.getStorage({
      key: data.key,
      success: ({ data: raw }) => {
        updateByRaw(raw)
      },
      fail: () => {
        updateByRaw(undefined)
      },
    })

    return data.value
  }

  return data
}

// 处理场景：uni.setStorage 其他地方显式被调用，保证数据一致
function listenDataChange<T>(data: Data<T>) {
  useUniInterceptor('setStorage', {
    invoke: (args) => {
      if (args[0].key !== data.key) {
        return false
      }
      // 非主动更新
      if (!data.isUpdating) {
        data.isUpdating = true

        const raw = (typeof args[0].data !== 'string' && !isNil(args[0].data))
          ? JSON.stringify(args[0].data)
          : args[0].data

        data.updateByRaw(raw)

        data.isUpdating = false
      }
    },
  })
  useUniInterceptor('removeStorage', {
    invoke: (args) => {
      if (args[0].key !== data.key) {
        return false
      }
      // 非主动更新
      if (!data.isUpdating) {
        data.isUpdating = true
        data.value = undefined as unknown as T
        data.isUpdating = false
      }
    },
  })
  useUniInterceptor('clearStorage', {
    complete: () => {
      data.isUpdating = true
      data.value = undefined as unknown as T
      data.isUpdating = false
    },
  })

  useUniInterceptor('setStorageSync', {
    invoke: (args) => {
      if (args[0] !== data.key) {
        return false
      }
      // 非主动更新
      if (!data.isUpdating) {
        data.isUpdating = true

        const raw = (typeof args[1] !== 'string' && args[1] != null)
          ? JSON.stringify(args[1])
          : args[1]

        data.updateByRaw(raw)

        data.isUpdating = false
      }
    },
  })
  useUniInterceptor('removeStorageSync', {
    invoke: (args) => {
      if (args[0] !== data.key) {
        return false
      }
      // 非主动更新
      if (!data.isUpdating) {
        data.isUpdating = true
        data.value = undefined as unknown as T
        data.isUpdating = false
      }
    },
  })
  useUniInterceptor('clearStorageSync', {
    complete: () => {
      data.isUpdating = true
      data.value = undefined as unknown as T
      data.isUpdating = false
    },
  })
}
