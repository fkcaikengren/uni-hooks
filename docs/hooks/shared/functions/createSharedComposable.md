# Function: createSharedComposable()

> **createSharedComposable**\<`Fn`\>(`composable`, `clearEffect?`): `Fn`

Defined in: [packages/uni-hooks-shared/src/createSharedComposable/index.ts:36](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks-shared/src/createSharedComposable/index.ts#L36)

**`Function`**

创建共享的可组合函数，确保多个组件之间共享同一个状态实例
 createSharedComposable

## Type Parameters

| Type Parameter |
| ------ |
| `Fn` *extends* [`AnyFn`](../type-aliases/AnyFn.md) |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `composable` | `Fn` | 可组合函数，用于创建共享状态 |
| `clearEffect?` | () => `void` | 可选的清理函数，在所有订阅者都销毁时调用 |

## Returns

`Fn`

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
