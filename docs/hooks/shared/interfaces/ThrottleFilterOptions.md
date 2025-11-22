# Interface: ThrottleFilterOptions

Defined in: [packages/uni-hooks-shared/src/utils/filters.ts:190](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks-shared/src/utils/filters.ts#L190)

ThrottleFilterOptions

## Properties

### delay

> **delay**: `MaybeRefOrGetter`\<`number`\>

Defined in: [packages/uni-hooks-shared/src/utils/filters.ts:194](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks-shared/src/utils/filters.ts#L194)

The maximum time allowed to be delayed before it's invoked.

***

### leading?

> `optional` **leading**: `boolean`

Defined in: [packages/uni-hooks-shared/src/utils/filters.ts:202](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks-shared/src/utils/filters.ts#L202)

Whether to invoke on the leading edge of the timeout.

***

### rejectOnCancel?

> `optional` **rejectOnCancel**: `boolean`

Defined in: [packages/uni-hooks-shared/src/utils/filters.ts:206](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks-shared/src/utils/filters.ts#L206)

Whether to reject the last call if it's been cancel.

***

### trailing?

> `optional` **trailing**: `boolean`

Defined in: [packages/uni-hooks-shared/src/utils/filters.ts:198](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks-shared/src/utils/filters.ts#L198)

Whether to invoke on the trailing edge of the timeout.
