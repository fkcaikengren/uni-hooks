import type { Ref } from 'vue'
import { ref } from 'vue'

export interface UseBooleanActions {
  toggle: () => void
  set: (value: boolean) => void
}

/**
 * 布尔值状态管理
 * 参考实现 https://inhiblabcore.github.io/vue-hooks-plus/hooks/useBoolean
 *
 * @function useBoolean
 * @param {boolean} [defaultValue] - 默认值，不传默认为false
 * @returns {[Ref<boolean>, UseBooleanActions]} 返回一个数组，包含布尔值ref和操作方法
 *
 * @example
 * // 基本用法
 * const [state, { toggle, set }] = useBoolean(true);
 *
 * // 切换状态
 * toggle(); // state.value === false
 *
 * // 设置状态
 * set(true); // state.value === true
 */
export function useBoolean(defaultValue = false): [Ref<boolean>, UseBooleanActions] {
  const state = ref(defaultValue)

  const actions: UseBooleanActions = {
    toggle: () => {
      state.value = !state.value
    },
    set: (value: boolean) => {
      state.value = value
    },
  }

  return [state, actions]
}
