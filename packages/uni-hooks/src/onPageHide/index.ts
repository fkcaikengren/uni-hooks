import type { ComponentInternalInstance } from 'vue'
import { onPageHide as _onPageHide } from '@dcloudio/uni-app'

/**
 *
 *
 * 页面隐藏生命周期钩子，可在子组件中使用。在H5环境中相当于window的visibilitychange事件，在小程序中相当于onHide。
 * 注意：不能在弹框类组件中使用（因为uni-app初始化时弹框DOM还没有生成导致onPageHide生命周期不能正确绑定）。
 * 解决方案：传递usePageVisibility的visibility响应式变量给其他可能被隐藏的组件
 * @function onPageHide
 * @param {Function} hook - 当页面隐藏时触发的回调函数
 * @param {object} [options] - 配置选项
 * @param {boolean} [options.skipFirst] - 如果为true，首次页面隐藏时不触发回调
 * @param {ComponentInternalInstance|null} [options.target] - Vue组件实例
 *
 * @example
 * import { onPageHide } from '@caikengren/uni-hooks';
 * export default {
 *   setup() {
 *    onPageHide(() => {
 *      console.log('页面隐藏');
 *    });
 *   },
 * };
 */
export function onPageHide(
  hook: () => void,
  options?: { skipFirst?: boolean, target?: ComponentInternalInstance | null },
) {
  let isFirstHide = true
  _onPageHide(() => {
    if (options?.skipFirst && isFirstHide) {
      isFirstHide = false
      return
    }
    isFirstHide = false
    hook()
  }, options?.target)
}
