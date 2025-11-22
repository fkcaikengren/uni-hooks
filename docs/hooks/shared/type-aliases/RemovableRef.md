# Type Alias: RemovableRef\<T\>

> **RemovableRef**\<`T`\> = `Omit`\<`Ref`\<`T`\>, `"value"`\> & `object`

Defined in: [packages/uni-hooks-shared/src/types.ts:61](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks-shared/src/types.ts#L61)

可空值的引用类型

## Type Declaration

### value

#### Get Signature

> **get** **value**(): `T`

##### Returns

`T`

#### Set Signature

> **set** **value**(`value`): `void`

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` \| `null` \| `undefined` |

##### Returns

`void`

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
