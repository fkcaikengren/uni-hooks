# Function: createSharedComposable()

> **createSharedComposable**\<`Fn$1`\>(`composable`, `clearEffect?`): `Fn$1`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:310

**`Function`**

创建共享的可组合函数，确保多个组件之间共享同一个状态实例

 createSharedComposable

## Type Parameters

| Type Parameter |
| ------ |
| `Fn$1` *extends* [`AnyFn`](../type-aliases/AnyFn.md) |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `composable` | `Fn$1` | 可组合函数，用于创建共享状态 |
| `clearEffect?` | () => `void` | 可选的清理函数，在所有订阅者都销毁时调用 |

## Returns

`Fn$1`

返回一个函数，调用该函数将返回共享的状态

## Example

```ts
import { createSharedComposable } from '@caikengren/uni-hooks';
import { ref } from 'vue';

// 创建一个共享的计数器
const useSharedCounter = createSharedComposable(() => {
  const count = ref(0);

  function increment() {
    count.value++;
  }

  return { count, increment };
});

// 在多个组件中使用，它们将共享同一个计数器状态
// 组件 A
const { count, increment } = useSharedCounter();

// 组件 B - 这里获取的是与组件 A 相同的状态实例
const { count, increment } = useSharedCounter();
```
