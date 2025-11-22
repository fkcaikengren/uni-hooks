# Interface: ThrottleFilterOptions

Defined in: packages/uni-hooks-shared/dist/index.d.ts:458

ThrottleFilterOptions

## Properties

### delay

> **delay**: `MaybeRefOrGetter`\<`number`\>

Defined in: packages/uni-hooks-shared/dist/index.d.ts:462

The maximum time allowed to be delayed before it's invoked.

***

### leading?

> `optional` **leading**: `boolean`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:470

Whether to invoke on the leading edge of the timeout.

***

### rejectOnCancel?

> `optional` **rejectOnCancel**: `boolean`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:474

Whether to reject the last call if it's been cancel.

***

### trailing?

> `optional` **trailing**: `boolean`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:466

Whether to invoke on the trailing edge of the timeout.
