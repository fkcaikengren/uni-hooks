/**
 * 请求管理
 * @see https://inhiblabcore.github.io/vue-hooks-plus/hooks/useRequest/quick-start
 * @function useRequest
 * 基于vue-hooks-plus改造的支持uni-app/h5跨端请求hook
 *
 * 实现参考 https://github.com//InhiblabCore/vue-hooks-plus
 */

export type * from './src/types'

export { default as useRequest } from './src/useRequest'
export type { CachedData } from './src/utils/cache'
