import type { Fn, PromisifyFn } from '@caikengren/uni-hooks-shared'
import type { MaybeRefOrGetter } from 'vue'
import { createFilterWrapper, throttleFilter } from '@caikengren/uni-hooks-shared'
/**
 * 节流函数，控制函数的执行频率
 * 参考实现 https://vueuse.org/shared/useDebounceFn/
 *
 * @function useThrottleFn
 * @param  fn 要被节流的函数
 * @param  [ms] 节流延迟时间，单位为毫秒，默认为200毫秒
 * @param  [trailing] 是否在延迟结束后调用函数，默认为false
 * @param  [leading] 是否在延迟开始前调用函数，默认为true
 * @param  [rejectOnCancel] 如果为true，在取消时会拒绝最后一次调用，默认为false
 * @returns 返回一个新的节流函数
 *
 * @example
 *
 * import { useThrottleFn } from '@caikengren/uni-hooks';
 *
 * // 基本用法
 * const throttledFn = useThrottleFn(() => {
 *   console.log('只会每200ms执行一次');
 * });
 *
 * // 自定义节流配置
 * const throttledFn = useThrottleFn(() => {
 *   console.log('自定义节流配置');
 * }, 1000);
 */
export function useThrottleFn<T extends Fn>(
  fn: T,
  ms: MaybeRefOrGetter<number> = 200,
  trailing = false,
  leading = true,
  rejectOnCancel = false,
): PromisifyFn<T> {
  return createFilterWrapper(
    throttleFilter(ms, trailing, leading, rejectOnCancel),
    fn,
  )
}
