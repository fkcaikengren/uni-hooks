import type { TryOptions } from '../types.ts'
import { onReady } from '@dcloudio/uni-app'
import { getCurrentInstance } from 'vue'
import { sleep } from '../utils'

type OnReadyParameters = Parameters<typeof onReady>

export type TryOnReadyOptions = TryOptions

/**
 * 安全的onReady。如果目标实例不存在会进行重试
 * 参考实现 https://github.com/uni-helper/uni-use
 * @function tryOnReady
 * @param {Function} hook - 页面准备完成时的回调函数
 * @param {ComponentInternalInstance|null} [target] - Vue组件实例
 * @param {object} [options] - 配置选项
 * @param {number} [options.retry] - 重试次数
 * @param {number} [options.interval] - 重试间隔时间(ms)
 * @param {boolean} [options.runFinally] - 重试失败后是否直接执行hook
 *
 * @example
 * // 基本用法
 * tryOnReady(() => {
 *   console.log('页面准备完成');
 * });
 *
 * // 指定目标实例和重试参数
 * tryOnReady(() => {
 *   console.log('页面准备完成');
 * }, instance, { retry: 5, interval: 200 });
 */
export async function tryOnReady(
  hook: OnReadyParameters[0],
  target?: OnReadyParameters[1],
  options: TryOnReadyOptions = {},
) {
  const {
    retry = 3,
    interval = 300,
    runFinally = true,
  } = options

  function tryBind() {
    const instance = (target || getCurrentInstance()) as OnReadyParameters[1] | undefined
    if (instance) {
      onReady(hook, instance)
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
    return onReady(hook)
  }

  throw new Error('Binding onReady failed, maximum number of attempts exceeded.')
}
