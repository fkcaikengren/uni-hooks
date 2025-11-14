import type { WatchCallback, WatchSource, WatchStopHandle } from 'vue';
import type { Pausable, PausableFilterOptions } from '../utils';
import { pausableFilter } from '../utils';
import type { WatchWithFilterOptions } from '../watchWithFilter';

import { watchWithFilter } from '../watchWithFilter';
import type { MapOldSources, MapSources } from '../types.ts';

export interface WatchPausableReturn extends Pausable {
  stop: WatchStopHandle
}

export type WatchPausableOptions<Immediate> = WatchWithFilterOptions<Immediate> & PausableFilterOptions;

/**
 * 可暂停的监听函数
 * 参考实现 https://vueuse.org/shared/watchPausable/
 * @function watchPausable
 * @param {WatchSource|WatchSource[]|object} source - 监听的数据源
 * @param {Function} cb - 数据源变化时的回调函数
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.immediate] - 是否立即触发回调
 * @param {boolean} [options.deep] - 是否深度监听
 * @param {string} [options.initialState='active'] - 初始状态，'active'或'inactive'
 * @returns {Object} 返回控制对象，包含stop、pause、resume和isActive方法
 *
 * @example
 * import { watchPausable } from '@caikengren/uni-hooks'
 * import { nextTick, shallowRef } from 'vue'
 *
 * const source = shallowRef('foo')
 *
 * const { stop, pause, resume } = watchPausable(
 *   source,
 *   v => console.log(`Changed to ${v}!`),
 * )
 *
 * source.value = 'bar'
 * await nextTick() // Changed to bar!
 *
 * pause()
 *
 * source.value = 'foobar'
 * await nextTick() // (nothing happend)
 *
 * resume()
 *
 * source.value = 'hello'
 * await nextTick() // Changed to hello!
 */
export function watchPausable<T extends Readonly<WatchSource<unknown>[]>, Immediate extends Readonly<boolean> = false>(
  sources: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: WatchPausableOptions<Immediate>
): WatchPausableReturn;
export function watchPausable<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchPausableOptions<Immediate>
): WatchPausableReturn;
export function watchPausable<T extends object, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchPausableOptions<Immediate>
): WatchPausableReturn;
export function watchPausable<Immediate extends Readonly<boolean> = false>(
  source: any,
  cb: any,
  options: WatchPausableOptions<Immediate> = {},
): WatchPausableReturn {
  const {
    eventFilter: filter,
    initialState = 'active',
    ...watchOptions
  } = options;

  const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState });
  const stop = watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter,
    },
  );

  return { stop, pause, resume, isActive };
}
