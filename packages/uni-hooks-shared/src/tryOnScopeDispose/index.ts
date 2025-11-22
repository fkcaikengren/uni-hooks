import { getCurrentScope, onScopeDispose } from 'vue'

/**
 * 在作用域生命周期内安全调用 onScopeDispose，如果不在作用域内则不执行任何操作
 * @function tryOnScopeDispose
 * @param {Function} fn 要执行的清理函数
 * @returns {boolean} 是否成功绑定了清理函数
 * @example
 * tryOnScopeDispose(() => {
 *   console.log('清理作用域')
 * })
 */
export function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
