# Function: onPageShow()

> **onPageShow**(`hook`, `options?`): `void`

Defined in: [packages/uni-hooks/src/onPageShow/index.ts:24](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks/src/onPageShow/index.ts#L24)

**`Function`**

页面可见生命周期钩子，可在子组件中使用。 h5中相当于window的visibilitychange事件， 小程序中相当于onShow。
注意：不能在弹框类组件中使用（因为uni-app初始化时弹框DOM还没有生成导致onPageShow生命周期不能正确绑定）。
解决方案：传递usePageVisibility的visibility响应式变量给其他可能被隐藏的组件。
 onPageShow

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hook` | () => `void` | 页面显示时的回调函数 |
| `options?` | \{ `skipFirst?`: `boolean`; `target?`: `ComponentInternalInstance` \| `null`; \} | 配置选项 |
| `options.skipFirst?` | `boolean` | 是否跳过首次页面显示触发 |
| `options.target?` | `ComponentInternalInstance` \| `null` | Vue组件实例，用于组件卸载时自动移除监听 |

## Returns

`void`

## Example

```ts
// 基本用法
onPageShow(() => {
  console.log('页面显示');
});

// 跳过首次触发. 注意：页面首次加载也会触发onPageShow，所以如果想跳过首次触发，可加上参数{ skipFirst: true }
onPageShow(() => {
  console.log('页面显示');
}, { skipFirst: true });
```
