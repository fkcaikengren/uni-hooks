import { ref, computed } from 'vue';
import { createSharedComposable } from '@caikengren/uni-hooks-shared';
import { tryOnMounted } from '@caikengren/uni-hooks-shared';
import { tryOnUnmounted } from '@caikengren/uni-hooks-shared';


/**
 * 获取窗口大小信息

 * @function useWindowSize
 * @returns {object} 窗口大小信息
 * @returns {Ref<number>} windowWidth 窗口宽度
 * @returns {Ref<number>} windowHeight 窗口高度
 * @returns {ComputedRef<boolean>} isLandscape 是否为横屏
 *
 * @example
 *
 * import { useWindowSize } from '@caikengren/uni-hooks';
 *
 * const { windowWidth, windowHeight, isLandscape } = useWindowSize();
 *
 * console.log(windowWidth.value, windowHeight.value, isLandscape.value);
 */
export const useWindowSize = createSharedComposable(() => {
  const windowWidth = ref<number>(0);
  const windowHeight = ref<number>(0);

  // 是否为横屏
  const isLandscape = computed(() => windowWidth.value > windowHeight.value);
  // 更新窗口大小信息
  const updateSize = () => {
    try {
      // 获取系统信息
      const systemInfo = uni.getSystemInfoSync();
      // 更新宽度和高度
      windowWidth.value = systemInfo.windowWidth;
      windowHeight.value = systemInfo.windowHeight;
    } catch (error) {
      console.error('[error]获取系统信息失败:', error);
    }
  };

  // 窗口大小变化的回调函数
  const onResize = () => {
    updateSize();
  };

  tryOnMounted(() => {
    updateSize();
    uni.onWindowResize(onResize);
  });

  tryOnUnmounted(() => {
    // 组件卸载时移除监听
    uni.offWindowResize(onResize);
  });

  return {
    windowWidth,
    windowHeight,
    isLandscape,
  };
});
