# Interface: TryOptions

Defined in: packages/uni-hooks-shared/dist/index.d.ts:13

TryOptions

## Properties

### interval?

> `optional` **interval**: `number`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:25

尝试间隔时长，单位 ms

#### Default

```ts
300
```

***

### retry?

> `optional` **retry**: `number`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:19

最大尝试次数

#### Default

```ts
3
```

***

### runFinally?

> `optional` **runFinally**: `boolean`

Defined in: packages/uni-hooks-shared/dist/index.d.ts:31

当超时时是否立即执行， 值为false时将在最后无法运行时抛出异常

#### Default

```ts
true
```
