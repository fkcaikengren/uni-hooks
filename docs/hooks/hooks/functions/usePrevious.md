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

Defined in: [packages/uni-hooks/src/usePrevious/index.ts:4](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/usePrevious/index.ts#L4)

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

Defined in: [packages/uni-hooks/src/usePrevious/index.ts:5](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/usePrevious/index.ts#L5)

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
