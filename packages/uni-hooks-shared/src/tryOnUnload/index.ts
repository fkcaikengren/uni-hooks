import { onUnload } from '@dcloudio/uni-app';
import type { TryOptions } from '../types.ts';
import { getCurrentInstance } from 'vue';
import { sleep } from '../utils';

type OnUnloadParameters = Parameters<typeof onUnload>;

export type TryOnUnloadOptions = TryOptions;

/**
 * 安全的onUnload。如果目标实例不存在会进行重试
 * 参考实现 https://github.com/uni-helper/uni-use
 * @function tryOnUnload
 * @param {Function} hook - 页面卸载时的回调函数
 * @param {ComponentInternalInstance|null} [target] - Vue组件实例
 * @param {Object} [options] - 配置选项
 * @param {number} [options.retry=3] - 重试次数
 * @param {number} [options.interval=300] - 重试间隔时间(ms)
 * @param {boolean} [options.runFinally=true] - 重试失败后是否直接执行hook
 *
 * @example
 * // 基本用法
 * tryOnUnload(() => {
 *   console.log('页面卸载');
 * });
 *
 * // 指定目标实例和重试参数
 * tryOnUnload(() => {
 *   console.log('页面卸载');
 * }, instance, { retry: 5, interval: 200 });
 */
export async function tryOnUnload(
  hook: OnUnloadParameters[0],
  target?: OnUnloadParameters[1],
  options: TryOnUnloadOptions = {},
) {
  const {
    retry = 3,
    interval = 300,
    runFinally = true,
  } = options;

  function tryBind() {
    const instance = (target || getCurrentInstance()) as OnUnloadParameters[1] | undefined;
    if (instance) {
      onUnload(hook, instance);
      return true;
    }

    return false;
  }
  for (let circle = 1; circle <= retry; circle++) {
    if (tryBind()) {
      return;
    }
    await sleep(interval);
  }

  if (runFinally) {
    return onUnload(hook);
  }

  throw new Error('Binding onUnload failed, maximum number of attempts exceeded.');
}
