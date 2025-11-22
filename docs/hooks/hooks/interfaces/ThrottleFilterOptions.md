# Interface: ThrottleFilterOptions

Defined in: packages/uni-hooks-shared/dist/index.d.ts:226

ThrottleFilterOptions

## Properties

### delay

> **delay**: `MaybeRefOrGetter`\<`number`\>

Defined in: packages/uni-hooks-shared/dist/index.d.ts:230

The maximum time allowed to be delayed before it's invoked.

***

### leading?

> `optional` **leading**: `boolean`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:238

Whether to invoke on the leading edge of the timeout.

***

### rejectOnCancel?

> `optional` **rejectOnCancel**: `boolean`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:242

Whether to reject the last call if it's been cancel.

***

### trailing?

> `optional` **trailing**: `boolean`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:234

Whether to invoke on the trailing edge of the timeout.
