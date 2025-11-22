import type { DebounceFilterOptions, Fn, PromisifyFn } from '@caikengren/uni-hooks-shared'
import type { MaybeRefOrGetter } from 'vue'
import { createFilterWrapper, debounceFilter } from '@caikengren/uni-hooks-shared'

export type UseDebounceFnReturn<T extends Fn> = PromisifyFn<T>

/**
 * 防抖函数，控制函数的执行频率
 * 参考实现 https://vueuse.org/shared/useDebounceFn/
 *
 * @function useDebounceFn
 * @param {Function} fn 要被防抖的函数
 * @param {number} [ms] 防抖时间间隔，单位为毫秒，默认为200毫秒
 * @param {object} [options] 配置项，
 * @param {boolean} [options.rejectOnCancel] 如果为true，在取消时会拒绝最后一次调用
 * @returns {Function} 返回一个新的防抖函数
 *
 * @example
 *
 * import { useDebounceFn } from '@caikengren/uni-hooks';
 *
 * // 基本用法
 * const debouncedFn = useDebounceFn(() => {
 *   console.log('只会在最后一次调用后200ms执行');
 * });
 *
 * // 自定义防抖时间
 * const debouncedFn = useDebounceFn(() => {
 *   console.log('只会在最后一次调用后1000ms执行');
 * }, 1000);
 */
export function useDebounceFn<T extends Fn>(
  fn: T,
  ms: MaybeRefOrGetter<number> = 200,
  options: DebounceFilterOptions = {},
): UseDebounceFnReturn<T> {
  return createFilterWrapper(
    debounceFilter(ms, options),
    fn,
  )
}
