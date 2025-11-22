import type { TryOptions } from '../types.ts'
import { onShow } from '@dcloudio/uni-app'
import { getCurrentInstance } from 'vue'
import { sleep } from '../utils'

type OnShowParameters = Parameters<typeof onShow>

export type TryOnShowOptions = TryOptions

/**
 * 安全的onShow。如果目标实例不存在会进行重试
 * 参考实现 https://github.com/uni-helper/uni-use
 * @function tryOnShow
 * @param {Function} hook - 页面显示时的回调函数
 * @param {ComponentInternalInstance|null} [target] - Vue组件实例
 * @param {object} [options] - 配置选项
 * @param {number} [options.retry] - 重试次数
 * @param {number} [options.interval] - 重试间隔时间(ms)
 * @param {boolean} [options.runFinally] - 重试失败后是否直接执行hook
 *
 * @example
 * // 基本用法
 * tryOnShow(() => {
 *   console.log('页面显示');
 * });
 *
 * // 指定目标实例和重试参数
 * tryOnShow(() => {
 *   console.log('页面显示');
 * }, instance, { retry: 5, interval: 200 });
 */
export async function tryOnShow(
  hook: OnShowParameters[0],
  target?: OnShowParameters[1],
  options: TryOnShowOptions = {},
) {
  const {
    retry = 3,
    interval = 300,
    runFinally = true,
  } = options

  function tryBind() {
    const instance = (target || getCurrentInstance()) as OnShowParameters[1] | undefined
    if (instance) {
      onShow(hook, instance)
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
    return onShow(hook)
  }

  throw new Error('Binding onShow failed, maximum number of attempts exceeded.')
}
