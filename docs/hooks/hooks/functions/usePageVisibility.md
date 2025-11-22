# Function: usePageVisibility()

> **usePageVisibility**(): `Ref`\<`boolean`, `boolean`\>

Defined in: [packages/uni-hooks/src/usePageVisibility/index.ts:16](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/usePageVisibility/index.ts#L16)

**`Function`**

页面可见性管理, 注意：不能在弹框类组件中使用（依赖onPageShow和onPageHide的缘故，如果在初始化没有挂载dom的组件中使用，会无法正常工作）。
解决方案：传递usePageVisibility的visibility响应式变量给其他可能被隐藏的组件
 usePageVisibility

## Returns

`Ref`\<`boolean`, `boolean`\>

页面是否可见

## Example

```ts
import { usePageVisibility } from '@caikengren/uni-hooks';
const isVisible = usePageVisibility();
watch(isVisible, (visible) => {
  console.log('页面可见性变化', visible);
});
```
