# Function: tryOnMounted()

> **tryOnMounted**(`hook`, `target?`, `options?`): `Promise`\<`void`\>

Defined in: [packages/uni-hooks-shared/src/tryOnMounted/index.ts:29](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks-shared/src/tryOnMounted/index.ts#L29)

**`Function`**

安全的onMounted。如果目标实例不存在会进行重试
 tryOnMounted

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hook` | `any` | 组件挂载时的回调函数 |
| `target?` | `ComponentInternalInstance` \| `null` | Vue组件实例 |
| `options?` | [`TryOptions`](../interfaces/TryOptions.md) | 配置选项 |

## Returns

`Promise`\<`void`\>

## Example

```ts
// 基本用法
tryOnMounted(() => {
  console.log('组件已挂载');
});

// 指定目标实例和重试参数
tryOnMounted(() => {
  console.log('组件已挂载');
}, instance, { retry: 5, interval: 200 });
```
