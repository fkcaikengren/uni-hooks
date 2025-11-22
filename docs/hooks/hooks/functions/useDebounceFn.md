# Function: useDebounceFn()

> **useDebounceFn**\<`T`\>(`fn`, `ms?`, `options?`): `UseDebounceFnReturn`\<`T`\>

Defined in: [packages/uni-hooks/src/useDebounceFn/index.ts:32](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks/src/useDebounceFn/index.ts#L32)

**`Function`**

防抖函数，控制函数的执行频率
参考实现 https://vueuse.org/shared/useDebounceFn/

 useDebounceFn

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`Fn`](../type-aliases/Fn.md) |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `fn` | `T` | `undefined` | 要被防抖的函数 |
| `ms?` | `MaybeRefOrGetter`\<`number`\> | `200` | 防抖时间间隔，单位为毫秒，默认为200毫秒 |
| `options?` | [`DebounceFilterOptions`](../interfaces/DebounceFilterOptions.md) | `{}` | 配置项， |

## Returns

`UseDebounceFnReturn`\<`T`\>

返回一个新的防抖函数

## Example

```ts
import { useDebounceFn } from '@caikengren/uni-hooks';

// 基本用法
const debouncedFn = useDebounceFn(() => {
  console.log('只会在最后一次调用后200ms执行');
});

// 自定义防抖时间
const debouncedFn = useDebounceFn(() => {
  console.log('只会在最后一次调用后1000ms执行');
}, 1000);
```
