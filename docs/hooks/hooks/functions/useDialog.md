# Function: useDialog()

> **useDialog**(`options`, `registerName?`): `UseDialogReturn`

Defined in: uni-hooks/src/useDialog/index.ts:111

dialog组件管理，接管弹框的打开和关闭

 useDialog

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `UseDialogOptions` | 配置选项 |
| `registerName?` | `string` \| `symbol` | 注册名，用于全局调用。当不为空时将注册到全局，可以通过useDialogStore来管理弹框 |

## Returns

`UseDialogReturn`

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
