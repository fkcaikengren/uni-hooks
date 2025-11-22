# Function: useThrottleFn()

> **useThrottleFn**\<`T`\>(`fn`, `ms?`, `trailing?`, `leading?`, `rejectOnCancel?`): `PromisifyFn`\<`T`\>

Defined in: [packages/uni-hooks/src/useThrottleFn/index.ts:30](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useThrottleFn/index.ts#L30)

**`Function`**

节流函数，控制函数的执行频率
参考实现 https://vueuse.org/shared/useDebounceFn/

 useThrottleFn

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`Fn`](../type-aliases/Fn.md) |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `fn` | `T` | `undefined` | 要被节流的函数 |
| `ms?` | `MaybeRefOrGetter`\<`number`\> | `200` | 节流延迟时间，单位为毫秒，默认为200毫秒 |
| `trailing?` | `boolean` | `false` | 是否在延迟结束后调用函数，默认为false |
| `leading?` | `boolean` | `true` | 是否在延迟开始前调用函数，默认为true |
| `rejectOnCancel?` | `boolean` | `false` | 如果为true，在取消时会拒绝最后一次调用，默认为false |

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
