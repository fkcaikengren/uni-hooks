import { computed, unref, watchEffect } from 'vue';
import { UseRequestPlugin } from '../types';
import { createFilterWrapper, throttleFilter  } from '@caikengren/uni-hooks-shared';
import type { ThrottleFilterOptions } from '@caikengren/uni-hooks-shared';

const useThrottlePlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  { throttleWait, throttleLeading, throttleTrailing },
) => {
  const options = computed(() => {
    const ret: ThrottleFilterOptions = { delay: 200 };
    if (unref(throttleWait) !== undefined) {
      ret.delay = unref(throttleWait) || 200;
    }
    if (unref(throttleLeading) !== undefined) {
      ret.leading = unref(throttleLeading);
    }
    if (unref(throttleTrailing) !== undefined) {
      ret.trailing = unref(throttleTrailing);
    }
    return ret;
  });

  // @ts-ignore
  const throttledRef = computed<DebouncedFunc<any>>(() => createFilterWrapper(
    throttleFilter(options.value),
    (callback: () => void) => {
      callback();
    },
  ));


  watchEffect((onInvalidate) => {
    if (unref(throttleWait)) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance);
      fetchInstance.runAsync = (...args) => new Promise((resolve, reject) => {
        throttledRef.value?.(() => {
          _originRunAsync(...args)
            .then(resolve)
            .catch(reject);
        });
      });
      onInvalidate(() => {
        fetchInstance.runAsync = _originRunAsync;
        throttledRef.value?.cancel();
      });
    }
  });

  if (!unref(throttleWait)) {
    return {};
  }

  return {
    name: 'throttlePlugin',
    onCancel: () => {
      throttledRef.value?.cancel();
    },
  };
};

export default useThrottlePlugin;
