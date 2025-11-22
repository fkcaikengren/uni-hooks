# Function: createStore()

> **createStore**\<`Fn`\>(`stateFactory`): `Fn`

Defined in: [packages/uni-hooks/src/createStore/index.ts:30](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/createStore/index.ts#L30)

**`Function`**

创建一个状态存储，确保状态只被初始化一次
参考实现 https://vueuse.org/shared/createGlobalState/
 createStore

## Type Parameters

| Type Parameter |
| ------ |
| `Fn` *extends* [`AnyFn`](../type-aliases/AnyFn.md) |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `stateFactory` | `Fn` | 状态工厂函数，用于创建初始状态 |

## Returns

`Fn`

返回一个函数，调用该函数将返回存储的状态

## Example

```ts
import { createStore } from '@caikengren/uni-hooks';

const useCounter = createStore(() => {
  const count = ref(0);

  function increment() {
    count.value++;
  }

  return { count, increment };
});

// 在组件中使用
const { count, increment } = useCounter();
```
