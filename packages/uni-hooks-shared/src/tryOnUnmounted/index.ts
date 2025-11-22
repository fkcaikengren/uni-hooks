import type { TryOptions } from '../types.ts'
import { getCurrentInstance, onUnmounted } from 'vue'
import { sleep } from '../utils'

type OnUnmountedParameters = Parameters<typeof onUnmounted>

export type TryOnUnmountedOptions = TryOptions

/**
 * 安全的onUnmounted。如果目标实例不存在会进行重试
 * 参考实现 https://github.com/uni-helper/uni-use
 * @function tryOnUnmounted
 * @param {Function} hook - 组件卸载时的回调函数
 * @param {ComponentInternalInstance|null} [target] - Vue组件实例
 * @param {object} [options] - 配置选项
 * @param {number} [options.retry] - 重试次数
 * @param {number} [options.interval] - 重试间隔时间(ms)
 * @param {boolean} [options.runFinally] - 重试失败后是否直接执行hook
 *
 * @example
 * // 基本用法
 * tryOnUnmounted(() => {
 *   console.log('组件卸载');
 * });
 *
 * // 指定目标实例和重试参数
 * tryOnUnmounted(() => {
 *   console.log('组件卸载');
 * }, instance, { retry: 5, interval: 200 });
 */
export async function tryOnUnmounted(
  hook: OnUnmountedParameters[0],
  target?: OnUnmountedParameters[1],
  options: TryOnUnmountedOptions = {},
) {
  const {
    retry = 3,
    interval = 300,
    runFinally = true,
  } = options

  function tryBind() {
    const instance = (target || getCurrentInstance()) as OnUnmountedParameters[1] | undefined
    if (instance) {
      onUnmounted(hook, instance)
      return true
    }

    return false
  }
  for (let circle = 1; circle <= retry; circle++) {
    if (tryBind()) {
      return
    }
    await sleep(interval)
  }

  if (runFinally) {
    return onUnmounted(hook)
  }

  throw new Error('Binding onUnmounted failed, maximum number of attempts exceeded.')
}
