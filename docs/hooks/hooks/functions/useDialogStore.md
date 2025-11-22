# Function: useDialogStore()

> **useDialogStore**(): [`DialogStore`](../interfaces/DialogStore.md)

Defined in: [packages/uni-hooks/src/useDialog/index.ts:57](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useDialog/index.ts#L57)

全局dialog管理仓库，管理通过useDialog注册的Dialog
 useDialogStore

## Returns

[`DialogStore`](../interfaces/DialogStore.md)

返回对象

## Example

```ts
import { useDialogStore } from '@caikengren/uni-hooks';

// 获取全局对话框管理仓库
const { openDialog, closeDialog } = useDialogStore();

// 打开已注册的对话框
openDialog('myDialog');

// 关闭已注册的对话框
closeDialog('myDialog');
```
