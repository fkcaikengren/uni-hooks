# Function: onPageHide()

> **onPageHide**(`hook`, `options?`): `void`

Defined in: [packages/uni-hooks/src/onPageHide/index.ts:26](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/onPageHide/index.ts#L26)

**`Function`**

页面隐藏生命周期钩子，可在子组件中使用。在H5环境中相当于window的visibilitychange事件，在小程序中相当于onHide。
注意：不能在弹框类组件中使用（因为uni-app初始化时弹框DOM还没有生成导致onPageHide生命周期不能正确绑定）。
解决方案：传递usePageVisibility的visibility响应式变量给其他可能被隐藏的组件
 onPageHide

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hook` | () => `void` | 当页面隐藏时触发的回调函数 |
| `options?` | \{ `skipFirst?`: `boolean`; `target?`: `ComponentInternalInstance` \| `null`; \} | 配置选项 |
| `options.skipFirst?` | `boolean` | 如果为true，首次页面隐藏时不触发回调 |
| `options.target?` | `ComponentInternalInstance` \| `null` | Vue组件实例 |

## Returns

`void`

## Example

```ts
import { onPageHide } from '@caikengren/uni-hooks';
export default {
  setup() {
   onPageHide(() => {
     console.log('页面隐藏');
   });
  },
};
```
