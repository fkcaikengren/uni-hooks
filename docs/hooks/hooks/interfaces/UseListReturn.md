# Interface: UseListReturn\<TData\>

Defined in: [packages/uni-hooks/src/useList/index.ts:125](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L125)

useList返回值

## Type Parameters

| Type Parameter |
| ------ |
| `TData` *extends* [`UseListData`](../type-aliases/UseListData.md) |

## Properties

### cancel()

> **cancel**: () => `void`

Defined in: [packages/uni-hooks/src/useList/index.ts:169](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L169)

取消当前Promise

#### Returns

`void`

***

### data

> **data**: `TData`

Defined in: [packages/uni-hooks/src/useList/index.ts:129](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L129)

带有列表数据的结果

***

### isEnd

> **isEnd**: `boolean`

Defined in: [packages/uni-hooks/src/useList/index.ts:144](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L144)

是否还有更多数据，true表示无更多分页数据

***

### loading

> **loading**: `boolean`

Defined in: [packages/uni-hooks/src/useList/index.ts:134](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L134)

加载第一页数据中

***

### loadingMore

> **loadingMore**: `boolean`

Defined in: [packages/uni-hooks/src/useList/index.ts:139](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L139)

加载更多数据中

***

### loadMore()

> **loadMore**: () => `void`

Defined in: [packages/uni-hooks/src/useList/index.ts:149](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L149)

加载更多数据，自动捕获错误，通过`options.onError`处理

#### Returns

`void`

***

### loadMoreAsync()

> **loadMoreAsync**: () => `Promise`\<`TData`\>

Defined in: [packages/uni-hooks/src/useList/index.ts:154](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L154)

加载更多数据，需要手动处理错误

#### Returns

`Promise`\<`TData`\>

***

### mutate()

> **mutate**: (`data?`) => `void`

Defined in: [packages/uni-hooks/src/useList/index.ts:174](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L174)

修改数据

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data?` | `TData` |

#### Returns

`void`

***

### reload()

> **reload**: () => `void`

Defined in: [packages/uni-hooks/src/useList/index.ts:159](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L159)

加载第一页的数据，自动捕获错误，通过`options.onError`处理

#### Returns

`void`

***

### reloadAsync()

> **reloadAsync**: () => `Promise`\<`TData`\>

Defined in: [packages/uni-hooks/src/useList/index.ts:164](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L164)

加载第一页的数据，需要手动处理错误

#### Returns

`Promise`\<`TData`\>
