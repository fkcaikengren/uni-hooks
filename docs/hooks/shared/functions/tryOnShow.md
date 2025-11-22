# Function: tryOnShow()

> **tryOnShow**(`hook`, `target?`, `options?`): `Promise`\<`void`\>

Defined in: [packages/uni-hooks-shared/src/tryOnShow/index.ts:32](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks-shared/src/tryOnShow/index.ts#L32)

**`Function`**

安全的onShow。如果目标实例不存在会进行重试
参考实现 https://github.com/uni-helper/uni-use
 tryOnShow

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hook` | (`options?`) => `void` \| () => `void` | 页面显示时的回调函数 |
| `target?` | `ComponentInternalInstance` \| `null` | Vue组件实例 |
| `options?` | [`TryOptions`](../interfaces/TryOptions.md) | 配置选项 |

## Returns

`Promise`\<`void`\>

## Example

```ts
// 基本用法
tryOnShow(() => {
  console.log('页面显示');
});

// 指定目标实例和重试参数
tryOnShow(() => {
  console.log('页面显示');
}, instance, { retry: 5, interval: 200 });
```
