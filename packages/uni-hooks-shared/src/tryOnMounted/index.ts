import type { TryOptions } from '../types.ts'
import { getCurrentInstance, onMounted } from 'vue'
import { sleep } from '../utils'

type OnMountedParameters = Parameters<typeof onMounted>

export type TryOnMountedOptions = TryOptions

/**
 * 安全的onMounted。如果目标实例不存在会进行重试
 * @function tryOnMounted
 * @param {Function} hook - 组件挂载时的回调函数
 * @param {ComponentInternalInstance|null} [target] - Vue组件实例
 * @param {object} [options] - 配置选项
 * @param {number} [options.retry] - 重试次数
 * @param {number} [options.interval] - 重试间隔时间(ms)
 * @param {boolean} [options.runFinally] - 重试失败后是否直接执行hook
 * @example
 * // 基本用法
 * tryOnMounted(() => {
 *   console.log('组件已挂载');
 * });
 *
 * // 指定目标实例和重试参数
 * tryOnMounted(() => {
 *   console.log('组件已挂载');
 * }, instance, { retry: 5, interval: 200 });
 */
export async function tryOnMounted(
  hook: OnMountedParameters[0],
  target?: OnMountedParameters[1],
  options: TryOnMountedOptions = {},
) {
  const {
    retry = 3,
    interval = 300,
    runFinally = true,
  } = options

  function tryBind() {
    const instance = (target || getCurrentInstance()) as OnMountedParameters[1] | undefined
    if (instance) {
      onMounted(hook, instance)
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
    return onMounted(hook)
  }

  throw new Error('Binding onMounted failed, maximum number of attempts exceeded.')
}
