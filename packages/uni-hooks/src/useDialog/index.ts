import { type ComputedRef, computed, reactive } from 'vue';
import { useBoolean } from '../useBoolean';
import { createSharedComposable } from '@caikengren/uni-hooks-shared';
import { tryOnUnmounted } from '@caikengren/uni-hooks-shared'

export interface UseDialogOptions {
  modelValueField?: string; // 双向绑定字段
}

export interface DialogInstance {
  open: () => void;
  close: () => void;
}

export interface DialogRegistry  {
  [key: string|symbol]: DialogInstance
}
export interface DialogStore {
  dialogRegistry: DialogRegistry,
  openDialog: (name: string) => void;
  closeDialog: (name: string) => void;
}


export interface UseDialogReturn {
  props: ComputedRef<{
    [x: string]: boolean | ((val: boolean, ...args: any[]) => void);
  }>;
  openDialog: () => void;
  closeDialog: () => void;
}


/**
 * 全局dialog管理仓库，管理通过useDialog注册的Dialog

 * @function useDialogStore
 * @returns {object} 返回对象
 * @returns {object} returns.dialogRegistry 对话框注册表，存储所有已注册的对话框实例
 * @returns {Function} returns.openDialog 通过注册名打开指定对话框的方法
 * @returns {Function} returns.closeDialog 通过注册名关闭指定对话框的方法
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
  const dialogRegistry: DialogRegistry = reactive({});
  return {
    dialogRegistry,
    openDialog: (name: string) => {
      if (dialogRegistry[name]) {
        dialogRegistry[name].open();
      } else {
        console.log(`[info]useDialogStore: ${name}未注册`);
      }
    },
    closeDialog: (name: string) => {
      if (dialogRegistry[name]) {
        dialogRegistry[name].close();
      } else {
        console.log(`[info]useDialogStore: ${name}未注册`);
      }
    },
  };
});


/**
 * dialog组件管理，接管弹框的打开和关闭

 * @function useDialog
 * @param {object} options 配置选项
 * @param {string} [options.modelValueField] 双向绑定字段名称，默认为'modelValue'
 * @param {string|symbol} [registerName] 注册名，用于全局调用。当不为空时将注册到全局，可以通过useDialogStore来管理弹框
 * @returns {object} 返回对象
 * @returns {object} returns.props 组件props，包含双向绑定和事件监听
 * @returns {Function} returns.openDialog 打开弹窗方法
 * @returns {Function} returns.closeDialog 关闭弹窗方法
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
export const useDialog = (options: UseDialogOptions = {}, registerName?: string|symbol): UseDialogReturn => {
  // 为一个dialog组件产生props，双向绑定和监听close事件
  const modelProp = options.modelValueField || 'modelValue';
  const { dialogRegistry } = useDialogStore();

  const [isVisible, { set: setVisible }] = useBoolean();
  const onUpdateVisible = (val: boolean) => {
    setVisible(val);
  };

  const props = computed(() => ({
    [modelProp]: isVisible.value,
    [`onUpdate:${modelProp}`]: onUpdateVisible,
  }));

  const openDialog = () => {
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
  };

  if (registerName && dialogRegistry) {
    dialogRegistry[registerName] = {
      open: openDialog,
      close: closeDialog,
    };
  }

  tryOnUnmounted(() => {
    if (registerName && dialogRegistry) {
      delete dialogRegistry[registerName];
    }
  });


  return {
    props,
    openDialog,
    closeDialog,
  };
};

