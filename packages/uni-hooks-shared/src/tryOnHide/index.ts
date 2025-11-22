import type { TryOptions } from '../types.ts'
import { onHide } from '@dcloudio/uni-app'
import { getCurrentInstance } from 'vue'
import { sleep } from '../utils'

type OnHideParameters = Parameters<typeof onHide>

export type TryOnHideOptions = TryOptions

/**
 * 安全的onHide。如果目标实例不存在会进行重试
 * 参考实现 https://github.com/uni-helper/uni-use
 * @function tryOnHide
 * @param {Function} hook - 页面隐藏时的回调函数
 * @param {ComponentInternalInstance|null} [target] - Vue组件实例
 * @param {object} [options] - 配置选项
 * @param {number} [options.retry] - 重试次数
 * @param {number} [options.interval] - 重试间隔时间(ms)
 * @param {boolean} [options.runFinally] - 重试失败后是否直接执行hook
 *
 * @example
 * // 基本用法
 * tryOnHide(() => {
 *   console.log('页面隐藏');
 * });
 *
 * // 指定目标实例和重试参数
 * tryOnHide(() => {
 *   console.log('页面隐藏');
 * }, instance, { retry: 5, interval: 200 });
 */
export async function tryOnHide(
  hook: OnHideParameters[0],
  target?: OnHideParameters[1],
  options: TryOnHideOptions = {},
) {
  const {
    retry = 3,
    interval = 300,
    runFinally = true,
  } = options

  function tryBind() {
    const instance = (target || getCurrentInstance()) as OnHideParameters[1] | undefined
    if (instance) {
      onHide(hook, instance)
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
    return onHide(hook)
  }

  throw new Error('Binding onHide failed, maximum number of attempts exceeded.')
}
