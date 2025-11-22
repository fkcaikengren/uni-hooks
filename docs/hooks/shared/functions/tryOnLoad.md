# Function: tryOnLoad()

> **tryOnLoad**(`hook`, `target?`, `options?`): `Promise`\<`void`\>

Defined in: [packages/uni-hooks-shared/src/tryOnLoad/index.ts:32](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks-shared/src/tryOnLoad/index.ts#L32)

**`Function`**

安全的onLoad。如果目标实例不存在会进行重试
参考实现 https://github.com/uni-helper/uni-use
 tryOnLoad

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hook` | (`query?`) => `void` | 页面加载时的回调函数 |
| `target?` | `ComponentInternalInstance` \| `null` | Vue组件实例 |
| `options?` | [`TryOptions`](../interfaces/TryOptions.md) | 配置选项 |

## Returns

`Promise`\<`void`\>

## Example

```ts
// 基本用法
tryOnLoad(() => {
  console.log('页面加载');
});

// 指定目标实例和重试参数
tryOnLoad(() => {
  console.log('页面加载');
}, instance, { retry: 5, interval: 200 });
```
