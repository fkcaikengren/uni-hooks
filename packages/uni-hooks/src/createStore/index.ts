import type { AnyFn } from '@caikengren/uni-hooks-shared';
import { effectScope } from 'vue';

export type CreateStoreReturn<Fn extends AnyFn = AnyFn> = Fn;

/**
 * 创建一个状态存储，确保状态只被初始化一次
 * 参考实现 https://vueuse.org/shared/createGlobalState/
 * @function createStore
 * @param {Function} stateFactory 状态工厂函数，用于创建初始状态
 * @returns {Function} 返回一个函数，调用该函数将返回存储的状态
 *
 * @example
 *
 * import { createStore } from '@caikengren/uni-hooks';
 *
 * const useCounter = createStore(() => {
 *   const count = ref(0);
 *
 *   function increment() {
 *     count.value++;
 *   }
 *
 *   return { count, increment };
 * });
 *
 * // 在组件中使用
 * const { count, increment } = useCounter();
 */
export function createStore<Fn extends AnyFn>(stateFactory: Fn): CreateStoreReturn<Fn> {
  let initialized = false;
  let state: any;
  const scope = effectScope(true);

  return ((...args: any[]) => {
    if (!initialized) {
      state = scope.run(() => stateFactory(...args))!;
      initialized = true;
    }
    return state;
  }) as Fn;
}
