import { unref, ref, watchEffect } from 'vue';
import type { UseRequestPlugin, Timeout } from '../types';

import { onPageShow, onPageHide } from '@dcloudio/uni-app';
import type { VoidFn } from '../../../../types';

const usePollingPlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  { pollingInterval, pollingWhenHidden = true, pollingErrorRetryCount = -1 },
) => {
  let timeouter: Timeout;
  const delayedPolling = ref<VoidFn | null>(null);
  const countRef = ref<number>(0);

  const isVisible = ref(false);
  onPageShow(() => {
    isVisible.value = true;
    // 当页面可见时，检查是否需要重新
    if (delayedPolling.value) {
      delayedPolling.value();
      delayedPolling.value = null;
    }
  });
  onPageHide(() => {
    isVisible.value = false;
  });


  const stopPolling = () => {
    if (timeouter) {
      clearTimeout(timeouter);
    }
    delayedPolling.value = null;
  };

  watchEffect(() => {
    if (!unref(pollingInterval)) {
      stopPolling();
    }
  });

  if (!unref(pollingInterval)) {
    return {};
  }

  return {
    name: 'pollingPlugin',
    onBefore: () => {
      stopPolling();
    },
    onError: () => {
      countRef.value += 1;
    },
    onSuccess: () => {
      countRef.value = 0;
    },
    onFinally: () => {
      if (
        pollingErrorRetryCount === -1
        // When an error occurs, the request is not repeated after pollingErrorRetryCount retries
        || (pollingErrorRetryCount !== -1 && countRef.value <= pollingErrorRetryCount)
      ) {
        timeouter = setTimeout(() => {
          // if pollingWhenHidden = false && document is hidden, then stop polling and subscribe revisible
          if (!pollingWhenHidden && !isVisible.value) {
            delayedPolling.value = () => {
              fetchInstance.refresh();
            };
          } else {
            fetchInstance.refresh();
          }
        }, unref(pollingInterval));
      } else {
        countRef.value = 0;
      }
    },
    onCancel: () => {
      stopPolling();
    },
  };
};

export default usePollingPlugin;
