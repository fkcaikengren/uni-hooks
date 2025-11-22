import type { WatchCallback, WatchOptions, WatchSource, WatchStopHandle } from 'vue'
import type { MapOldSources, MapSources } from '../types.ts'
import type { ConfigurableEventFilter } from '../utils'
import { watch } from 'vue'
import { bypassFilter, createFilterWrapper } from '../utils'

export interface WatchWithFilterOptions<Immediate> extends WatchOptions<Immediate>, ConfigurableEventFilter {}

// overloads
export function watchWithFilter<T extends Readonly<WatchSource<unknown>[]>, Immediate extends Readonly<boolean> = false>(
  sources: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: WatchWithFilterOptions<Immediate>,
): WatchStopHandle
export function watchWithFilter<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchWithFilterOptions<Immediate>,
): WatchStopHandle
export function watchWithFilter<T extends object, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchWithFilterOptions<Immediate>,
): WatchStopHandle

/**
 * 带过滤器的watch函数，可控制回调的执行频率
 * 参考实现 https://vueuse.org/shared/watchWithFilter/
 * @function watchWithFilter
 * @param {WatchSource} source 要监听的数据源
 * @param {Function} cb 回调函数
 * @param {object} [options] 配置选项
 * @param {Function} [options.eventFilter] 事件过滤器，默认为直接通过
 * @param {boolean} [options.immediate] 是否立即执行回调
 * @param {boolean} [options.deep] 是否深度监听
 * @param {string} [options.flush] 回调执行时机
 * @param {boolean} [options.onTrack] 开发模式下追踪依赖
 * @param {boolean} [options.onTrigger] 开发模式下追踪触发
 * @returns {WatchStopHandle} 返回一个停止监听的函数
 *
 * @example
 *
 * import { watchWithFilter, debounceFilter } from '@caikengren/uni-hooks';
 *
 * // 基本用法
 * watchWithFilter(
 *   () => count.value,
 *   () => {
 *     console.log('count changed');
 *   }
 * );
 *
 * // 使用防抖过滤器
 * watchWithFilter(
 *   () => count.value,
 *   () => {
 *     console.log('count changed with debounce');
 *   },
 *   {
 *     eventFilter: debounceFilter(500)
 *   }
 * );
 */
export function watchWithFilter<Immediate extends Readonly<boolean> = false>(
  source: any,
  cb: any,
  options: WatchWithFilterOptions<Immediate> = {},
): WatchStopHandle {
  const {
    eventFilter = bypassFilter,
    ...watchOptions
  } = options

  return watch(
    source,
    createFilterWrapper(
      eventFilter,
      cb,
    ),
    watchOptions,
  )
}
