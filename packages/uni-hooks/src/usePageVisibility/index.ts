import { ref } from 'vue';
import { onPageShow, onPageHide } from '@dcloudio/uni-app';

/**
 * 页面可见性管理, 注意：不能在弹框类组件中使用（依赖onPageShow和onPageHide的缘故，如果在初始化没有挂载dom的组件中使用，会无法正常工作）。
 * 解决方案：传递usePageVisibility的visibility响应式变量给其他可能被隐藏的组件
 *

 * @function usePageVisibility
 * @returns {Ref<boolean>} 页面是否可见
 * @example
 * import { usePageVisibility } from '@caikengren/uni-hooks';
 * const isVisible = usePageVisibility();
 * watch(isVisible, (visible) => {
 *   console.log('页面可见性变化', visible);
 * });
 */
export function usePageVisibility() {
  const isVisible = ref(false);

  onPageShow(() => {
    isVisible.value = true;
  });

  onPageHide(() => {
    isVisible.value = false;
  });

  return isVisible;
}
