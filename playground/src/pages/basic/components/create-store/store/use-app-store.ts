import { createStore, useRequest } from '@caikengren/uni-hooks'

// 模拟 API 请求函数
const mockQueryHomeInfo: () => Promise<{
  configName: string
  configId: string
}> = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      configName: '首页配置',
      configId: 'home-config-001',
    })
  }, 1000) // 模拟网络延迟 1 秒
})

// 数据仓库
export const useAppStore = createStore(() => {
  /* 方法 */
  const {
    data: commonInfo,
    run: queryHomeInfo,
    refresh: refreshHomeInfo,
    mutate,
  } = useRequest(
    async () => {
      try {
        // 使用模拟的 API 请求函数
        const data = await mockQueryHomeInfo()
        return data
      }
      catch (error) {
        console.error('【queryHomeInfo失败】：', error)
      }
    },
    {
      onSuccess(data) {
        console.log('【queryHomeInfo请求成功data】：', data)
      },
      throttleWait: 500,
      manual: true,
    },
  )

  const updateCommonInfo = (data: any) => {
    mutate(data)
  }

  return {
    commonInfo,
    updateCommonInfo,
    // 方法
    queryHomeInfo,
    refreshHomeInfo,
  }
})
