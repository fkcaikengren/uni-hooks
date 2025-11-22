import type { UseRequestFetchState, UseRequestPlugin } from '../types'

import { ref, unref, watch, watchEffect } from 'vue'

// support refreshDeps & ready
const useAutoRunPlugin: UseRequestPlugin<unknown, unknown[]> = (
  fetchInstance,
  { manual, ready = true, refreshDeps = [], refreshDepsAction },
) => {
  const hasAutoRun = ref(false)

  watchEffect(() => {
    if (!manual && fetchInstance.options.refreshDeps !== true) {
      hasAutoRun.value = unref(ready)
    }
  })

  if (Array.isArray(refreshDeps)) {
    watch(
      [hasAutoRun, ...refreshDeps],
      ([autoRun]) => {
        if (!autoRun)
          return
        if (!manual && autoRun) {
          if (refreshDepsAction) {
            refreshDepsAction()
          }
          else {
            fetchInstance.refresh()
          }
        }
      },
      {
        deep: true,
        immediate: false,
      },
    )
  }
  else {
    watch(hasAutoRun, (h) => {
      if (!manual && h) {
        if (refreshDepsAction) {
          refreshDepsAction()
        }
        else {
          fetchInstance.refresh()
        }
      }
    })
  }

  return {
    name: 'autoRunPlugin',
    onBefore: () => {
      if (!unref(ready)) {
        return {
          stopNow: true,
        }
      }
    },
  }
}

useAutoRunPlugin.onInit = ({ ready = true, manual }) => ({
  loading: (!manual && unref(ready)) as UseRequestFetchState<any, any[]>['loading'],
})

export default useAutoRunPlugin
