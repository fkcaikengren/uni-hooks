

import { type EffectScope, effectScope, onScopeDispose } from 'vue';
import type { AnyFn } from '../types.ts';

export type CreateSharedComposableReturn<Fn extends AnyFn = AnyFn> = Fn;

/**
 * 创建共享的可组合函数，确保多个组件之间共享同一个状态实例

 * @function createSharedComposable
 * @param {Function} composable 可组合函数，用于创建共享状态
 * @param {Function} [clearEffect] 可选的清理函数，在所有订阅者都销毁时调用
 * @returns {Function} 返回一个函数，调用该函数将返回共享的状态
 *
 * @example
 *
 * import { createSharedComposable } from '@caikengren/uni-hooks';
 * import { ref } from 'vue';
 *
 * // 创建一个共享的计数器
 * const useSharedCounter = createSharedComposable(() => {
 *   const count = ref(0);
 *
 *   function increment() {
 *     count.value++;
 *   }
 *
 *   return { count, increment };
 * });
 *
 * // 在多个组件中使用，它们将共享同一个计数器状态
 * // 组件 A
 * const { count, increment } = useSharedCounter();
 *
 * // 组件 B - 这里获取的是与组件 A 相同的状态实例
 * const { count, increment } = useSharedCounter();
 */
export function createSharedComposable<Fn extends AnyFn>(
  composable: Fn,
  clearEffect?: () => void,
): CreateSharedComposableReturn<Fn>  {
  let subscribers = 0;
  let state: any;
  let scope: EffectScope | null;

  const dispose = () => {
    subscribers -= 1;
    if (scope && subscribers <= 0) {
      scope.stop();
      state = null;
      scope = null;
      clearEffect?.();
    }
  };

  return ((...args: any[]) => {
    subscribers += 1;
    if (!state) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    onScopeDispose(dispose);
    return state;
  }) as Fn;
}
