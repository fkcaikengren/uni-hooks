# Function: usePrevious()

**`Function`**

监听 ref 变化，返回上一个值
参考实现 https://inhiblabcore.github.io/vue-hooks-plus/hooks/usePrevious
 usePrevious

## Param

ref 或 getter 函数

## Param

初始值

## Call Signature

> **usePrevious**\<`T`\>(`value`): `Readonly`\<`ShallowRef`\<`T` \| `undefined`\>\>

Defined in: uni-hooks/src/usePrevious/index.ts:6

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `MaybeRefOrGetter`\<`T`\> |

### Returns

`Readonly`\<`ShallowRef`\<`T` \| `undefined`\>\>

## Call Signature

> **usePrevious**\<`T`\>(`value`, `initialValue`): `Readonly`\<`ShallowRef`\<`T`\>\>

Defined in: uni-hooks/src/usePrevious/index.ts:7

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `MaybeRefOrGetter`\<`T`\> |
| `initialValue` | `T` |

### Returns

`Readonly`\<`ShallowRef`\<`T`\>\>
