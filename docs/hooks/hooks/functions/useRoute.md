# Function: useRoute()

> **useRoute**(): `RouteInfo`

Defined in: uni-hooks/src/useRoute/index.ts:32

**`Function`**

获取路由信息

 useRoute

## Returns

`RouteInfo`

路由信息

## Example

```ts
import { useRoute } from '@caikengren/uni-hooks';

const { path, query, queryStr } = useRoute();
console.log(path, query, queryStr);
```
