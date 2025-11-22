# Function: tryOnScopeDispose()

> **tryOnScopeDispose**(`fn`): `boolean`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:238

**`Function`**

在作用域生命周期内安全调用 onScopeDispose，如果不在作用域内则不执行任何操作
 tryOnScopeDispose

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | () => `void` | 要执行的清理函数 |

## Returns

`boolean`

是否成功绑定了清理函数

## Example

```ts
tryOnScopeDispose(() => {
  console.log('清理作用域')
})
```
