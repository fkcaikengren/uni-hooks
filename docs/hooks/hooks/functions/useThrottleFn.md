# Function: useThrottleFn()

> **useThrottleFn**\<`T`\>(`fn`, `ms`, `trailing`, `leading`, `rejectOnCancel`): `PromisifyFn`\<`T`\>

Defined in: uni-hooks/src/useThrottleFn/index.ts:30

**`Function`**

节流函数，控制函数的执行频率
参考实现 https://vueuse.org/shared/useDebounceFn/
 useThrottleFn

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Fn` |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `fn` | `T` | `undefined` | 要被节流的函数 |
| `ms` | `MaybeRefOrGetter`\<`number`\> | `200` | - |
| `trailing` | `boolean` | `false` | - |
| `leading` | `boolean` | `true` | - |
| `rejectOnCancel` | `boolean` | `false` | - |

## Returns

`PromisifyFn`\<`T`\>

返回一个新的节流函数

## Example

```ts
import { useThrottleFn } from '@caikengren/uni-hooks';

// 基本用法
const throttledFn = useThrottleFn(() => {
  console.log('只会每200ms执行一次');
});

// 自定义节流配置
const throttledFn = useThrottleFn(() => {
  console.log('自定义节流配置');
}, 1000);
```
