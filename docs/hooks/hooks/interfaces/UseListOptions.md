# Interface: UseListOptions\<TData\>

Defined in: [packages/uni-hooks/src/useList/index.ts:66](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L66)

UseListOptions

## Type Parameters

| Type Parameter |
| ------ |
| `TData` |

## Properties

### hasMore()?

> `optional` **hasMore**: (`data?`) => `boolean`

Defined in: [packages/uni-hooks/src/useList/index.ts:70](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L70)

自定义判断是否还有更多数据

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data?` | `TData` |

#### Returns

`boolean`

***

### isEndField?

> `optional` **isEndField**: `string`

Defined in: [packages/uni-hooks/src/useList/index.ts:100](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L100)

映射是否无更多数据的字段

***

### listField?

> `optional` **listField**: `string`

Defined in: [packages/uni-hooks/src/useList/index.ts:96](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L96)

映射列表数据的字段

***

### loadingToastMessage?

> `optional` **loadingToastMessage**: `string`

Defined in: [packages/uni-hooks/src/useList/index.ts:80](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L80)

加载提示的文本

#### Default

```ts
"加载中"
```

***

### manual?

> `optional` **manual**: `boolean`

Defined in: [packages/uni-hooks/src/useList/index.ts:86](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L86)

是否在初始化的时手动触发service请求。
true 则需要手动调用 `run` 或 `runAsync` 触发执行，false 则在初始化时自动触发service请求

#### Default

```ts
true
```

***

### onBefore()?

> `optional` **onBefore**: () => `void`

Defined in: [packages/uni-hooks/src/useList/index.ts:104](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L104)

Triggered before service execution

#### Returns

`void`

***

### onError()?

> `optional` **onError**: (`e`) => `void`

Defined in: [packages/uni-hooks/src/useList/index.ts:114](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L114)

Triggered when service reject

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `e` | `Error` |

#### Returns

`void`

***

### onFinally()?

> `optional` **onFinally**: (`data?`, `e?`) => `void`

Defined in: [packages/uni-hooks/src/useList/index.ts:119](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L119)

Triggered when service execution is complete

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data?` | `TData` |
| `e?` | `Error` |

#### Returns

`void`

***

### onSuccess()?

> `optional` **onSuccess**: (`data`) => `void`

Defined in: [packages/uni-hooks/src/useList/index.ts:109](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L109)

Triggered when service resolve

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `TData` |

#### Returns

`void`

***

### reloadDeps?

> `optional` **reloadDeps**: `any`

Defined in: [packages/uni-hooks/src/useList/index.ts:91](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L91)

依赖数组，当依赖变化时自动重新加载数据

***

### showLoadingToast?

> `optional` **showLoadingToast**: `boolean`

Defined in: [packages/uni-hooks/src/useList/index.ts:75](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useList/index.ts#L75)

是否显示加载提示

#### Default

```ts
false
```
