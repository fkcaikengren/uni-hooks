import { getCurrentInstance } from 'vue'

/**
 * 页面滚动控制选项接口
 * @interface UsePageScrollOptions
 */
export interface UsePageScrollOptions {

  /**
   * 滚动动画时长（仅支持小程序）。 定义页面滚动动画的持续时间，单位为毫秒(ms)。该参数仅在小程序环境中生效，H5环境会忽略此参数
   * @type {number}
   * @default 300
   */
  duration?: number
}

/**
 * 页面滚动控制。仅支持在页面组件中使用（不兼容在子组件中使用）提供页面滚动控制功能，可以滚动到指定元素位置。在H5环境使用原生scrollIntoView，在小程序环境使用uni.pageScrollTo实现
 * @param {UsePageScrollOptions} [options] - 滚动控制选项
 * @param {number} [options.duration] - 滚动动画时长，单位毫秒，仅小程序环境有效
 * @returns {{ scrollToSelector: (selector: string) => void }} 返回对象
 * @example
 * // 基本用法
 * import { usePageScroll } from '@caikengren/uni-hooks';
 *
 * export default {
 *   setup() {
 *     // 默认配置
 *     const { scrollToSelector } = usePageScroll();
 *
 *     // 自定义滚动动画时长（仅小程序有效）
 *     const { scrollToSelector: scrollWithCustomDuration } = usePageScroll({
 *       duration: 500 // 设置滚动动画时长为500ms
 *     });
 *
 *     // 滚动到指定元素
 *     const scrollToElement = () => {
 *       scrollToSelector('#target-element');
 *     };
 *
 *     return {
 *       scrollToElement
 *     };
 *   }
 * };
 */
export function usePageScroll(options: UsePageScrollOptions = {}) {
  const { duration = 300 } = options
  const instance = getCurrentInstance()
  /**
   * 滚动到指定选择器的元素位置
   * @param {string} selector - CSS选择器
   * @returns {void}
   */
  const scrollToSelector = (selector: string) => {
    if (selector) {
      // #ifdef H5
      // 获取目标元素的位置
      const targetElement = document.querySelector(selector)
      targetElement?.scrollIntoView({
        behavior: 'smooth', // 平滑滚动（可选）
        block: 'start', // 定义目标元素与视口顶部的对齐方式（可选）
      })
      // #endif

      // #ifndef H5
      uni.createSelectorQuery()
        .in(instance) // 指定在当前组件内查询
        .select(selector)
        .boundingClientRect((data) => {
          const rect = Array.isArray(data) ? data[0] : data
          if (rect?.top) {
            uni.pageScrollTo({
              scrollTop: rect.top, // 使用元素的top值
              duration,
            })
          }
          else {
            console.log('[info]pmd-use: usePageScroll未找到匹配的元素')
          }
        })
        .exec()
      // #endif
    }
  }

  return {
    scrollToSelector,
  }
}
