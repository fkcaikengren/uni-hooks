import { ref, watchEffect, unref } from 'vue';
import type { UseRequestPlugin } from '../types';
import { createFilterWrapper, debounceFilter  } from '@caikengren/uni-hooks-shared';


const useDebouncePlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  { debounceWait, debounceMaxWait },
) => {
  const debouncedRef = ref<ReturnType<typeof createFilterWrapper>>();

  watchEffect((onInvalidate) => {
    if (unref(debounceWait)) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance);
      debouncedRef.value = createFilterWrapper(
        debounceFilter(debounceWait || 200, { maxWait: unref(debounceMaxWait)  }),
        (callback: () => void) => {
          callback();
        },
      );
      fetchInstance.runAsync = (...args) => new Promise((resolve, reject) => {
        debouncedRef.value?.(() => {
          _originRunAsync(...args)
            .then(resolve)
            .catch(reject);
        });
      });
      onInvalidate(() => {
        debouncedRef.value?.cancel();
        fetchInstance.runAsync = _originRunAsync;
      });
    }
  });

  if (!unref(debounceWait)) {
    return {};
  }

  return {
    name: 'debouncePlugin',
    onCancel: () => {
      debouncedRef.value?.cancel();
    },
  };
};

export default useDebouncePlugin;
