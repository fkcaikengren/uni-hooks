import type { ComputedRef } from 'vue'
import { createSharedComposable, tryOnUnmounted } from '@caikengren/uni-hooks-shared'
import { computed, reactive } from 'vue'
import { useBoolean } from '../useBoolean'

export interface UseDialogOptions {
  modelValueField?: string // 双向绑定字段
}

export interface DialogInstance {
  open: () => void
  close: () => void
}

export interface DialogRegistry {
  [key: string | symbol]: DialogInstance
}

/**
 * DialogStore
 */
export interface DialogStore {
  dialogRegistry: DialogRegistry
  openDialog: (name: string) => void
  closeDialog: (name: string) => void
}

/**
 * UseDialogReturn
 */
export interface UseDialogReturn {
  props: ComputedRef<{
    [x: string]: boolean | ((val: boolean, ...args: any[]) => void)
  }>
  openDialog: () => void
  closeDialog: () => void
}

/**
 * 全局dialog管理仓库，管理通过useDialog注册的Dialog
 * @function useDialogStore
 * @returns { UseDialogReturn } 返回对象
 *
 * @example
 *
 * import { useDialogStore } from '@caikengren/uni-hooks';
 *
 * // 获取全局对话框管理仓库
 * const { openDialog, closeDialog } = useDialogStore();
 *
 * // 打开已注册的对话框
 * openDialog('myDialog');
 *
 * // 关闭已注册的对话框
 * closeDialog('myDialog');
 */
export const useDialogStore = createSharedComposable((): DialogStore => {
  const dialogRegistry: DialogRegistry = reactive({})
  return {
    dialogRegistry,
    openDialog: (name: string) => {
      if (dialogRegistry[name]) {
        dialogRegistry[name].open()
      }
      else {
        console.log(`[info]useDialogStore: ${name}未注册`)
      }
    },
    closeDialog: (name: string) => {
      if (dialogRegistry[name]) {
        dialogRegistry[name].close()
      }
      else {
        console.log(`[info]useDialogStore: ${name}未注册`)
      }
    },
  }
})

/**
 * dialog组件管理，接管弹框的打开和关闭
 *
 * @function useDialog
 * @param {{ modelValueField?: string }} [options] 配置选项
 * @param {string|symbol} [registerName] 注册名，用于全局调用。当不为空时将注册到全局，可以通过useDialogStore来管理弹框
 * @returns {UseDialogReturn} 返回对象
 *
 * @example
 *
 * import { useDialog } from '@caikengren/uni-hooks';
 *
 * // 在组件中使用
 * const { props, openDialog, closeDialog } = useDialog();
 *
 * // 使用自定义配置
 * const { props, openDialog, closeDialog } = useDialog({
 *   modelValueField: 'visible',
 * }, 'myDialog');
 *
 * // 在模板中使用
 * // <MyDialog v-bind="props" />
 *
 * // 在其他组件中通过全局调用
 * import { useDialogStore } from '@caikengren/uni-hooks';
 *
 * const { openDialog, closeDialog } = useDialogStore();
 * openDialog('myDialog');
 */
export function useDialog(options: UseDialogOptions = {}, registerName?: string | symbol): UseDialogReturn {
  // 为一个dialog组件产生props，双向绑定和监听close事件
  const modelProp = options.modelValueField || 'modelValue'
  const { dialogRegistry } = useDialogStore()

  const [isVisible, { set: setVisible }] = useBoolean()
  const onUpdateVisible = (val: boolean) => {
    setVisible(val)
  }

  const props = computed(() => ({
    [modelProp]: isVisible.value,
    [`onUpdate:${modelProp}`]: onUpdateVisible,
  }))

  const openDialog = () => {
    setVisible(true)
  }

  const closeDialog = () => {
    setVisible(false)
  }

  if (registerName && dialogRegistry) {
    dialogRegistry[registerName] = {
      open: openDialog,
      close: closeDialog,
    }
  }

  tryOnUnmounted(() => {
    if (registerName && dialogRegistry) {
      delete dialogRegistry[registerName]
    }
  })

  return {
    props,
    openDialog,
    closeDialog,
  }
}
