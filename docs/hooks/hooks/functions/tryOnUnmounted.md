# Function: tryOnUnmounted()

> **tryOnUnmounted**(`hook`, `target?`, `options?`): `Promise`\<`void`\>

Defined in: packages/uni-hooks-shared/dist/index.d.ts:319

**`Function`**

安全的onUnmounted。如果目标实例不存在会进行重试
参考实现 https://github.com/uni-helper/uni-use
 tryOnUnmounted

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hook` | `any` | 组件卸载时的回调函数 |
| `target?` | `ComponentInternalInstance` \| `null` | Vue组件实例 |
| `options?` | [`TryOptions`](../interfaces/TryOptions.md) | 配置选项 |

## Returns

`Promise`\<`void`\>

## Example

```ts
// 基本用法
tryOnUnmounted(() => {
  console.log('组件卸载');
});

// 指定目标实例和重试参数
tryOnUnmounted(() => {
  console.log('组件卸载');
}, instance, { retry: 5, interval: 200 });
```
