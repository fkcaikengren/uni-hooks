# Function: useRoute()

> **useRoute**(): [`RouteInfo`](../interfaces/RouteInfo.md)

Defined in: [packages/uni-hooks/src/useRoute/index.ts:42](https://github.com/fkcaikengren/uni-hooks/blob/c71912b5e47bfa806e221a27ad2f17af810e47f9/packages/uni-hooks/src/useRoute/index.ts#L42)

**`Function`**

获取路由信息
 useRoute

## Returns

[`RouteInfo`](../interfaces/RouteInfo.md)

路由信息

## Example

```ts
import { useRoute } from '@caikengren/uni-hooks';

const { path, query, queryStr } = useRoute();
console.log(path, query, queryStr);
```
