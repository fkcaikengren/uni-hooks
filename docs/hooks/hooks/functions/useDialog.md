# Function: useDialog()

> **useDialog**(`options?`, `registerName?`): [`UseDialogReturn`](../interfaces/UseDialogReturn.md)

Defined in: [packages/uni-hooks/src/useDialog/index.ts:109](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useDialog/index.ts#L109)

**`Function`**

dialog组件管理，接管弹框的打开和关闭

 useDialog

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | `UseDialogOptions` | 配置选项 |
| `registerName?` | `string` \| `symbol` | 注册名，用于全局调用。当不为空时将注册到全局，可以通过useDialogStore来管理弹框 |

## Returns

[`UseDialogReturn`](../interfaces/UseDialogReturn.md)

返回对象

## Example

```ts
import { useDialog } from '@caikengren/uni-hooks';

// 在组件中使用
const { props, openDialog, closeDialog } = useDialog();

// 使用自定义配置
const { props, openDialog, closeDialog } = useDialog({
  modelValueField: 'visible',
}, 'myDialog');

// 在模板中使用
// <MyDialog v-bind="props" />

// 在其他组件中通过全局调用
import { useDialogStore } from '@caikengren/uni-hooks';

const { openDialog, closeDialog } = useDialogStore();
openDialog('myDialog');
```
