# Interface: RouteInfo

Defined in: [packages/uni-hooks/src/useRoute/index.ts:11](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks/src/useRoute/index.ts#L11)

RouteInfo 路由信息

## Properties

### path

> **path**: `string`

Defined in: [packages/uni-hooks/src/useRoute/index.ts:16](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks/src/useRoute/index.ts#L16)

path 路由路径

#### Example

```ts
/pages/index
```

***

### query

> **query**: `Record`\<`string`, `string`\>

Defined in: [packages/uni-hooks/src/useRoute/index.ts:22](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks/src/useRoute/index.ts#L22)

query 路由参数

#### Default

```ts
{}
```

#### Example

```ts
{ a: 1, b: 2 }
```

***

### queryStr

> **queryStr**: `string`

Defined in: [packages/uni-hooks/src/useRoute/index.ts:27](https://github.com/fkcaikengren/uni-hooks/blob/main/packages/uni-hooks/src/useRoute/index.ts#L27)

queryStr 路由参数字符串

#### Example

```ts
a=1&b=2
```
