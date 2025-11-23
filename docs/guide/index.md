# 指南

uni-hooks 是一个面向 uni-app 的 hooks 工具库。

## 安装

```bash
npm add uni-hooks
```
或者
```bash
yarn add uni-hooks
```
或者 (recommended)
```bash
pnpm add uni-hooks
```


## 基础示例

```ts
import { useRoute, useRequest } from '@caikengren/uni-hooks';

const { path, query, queryStr } = useRoute();
console.log(path, query, queryStr);

// uni-hooks依赖了 '@caikengren/uni-use-request', 提供了 useRequest 相关功能
const { data, error, loading } = useRequest(service)
```

## useRequest 

### useRequest 示例
```ts
import { useRequest } from '@caikengren/uni-use-request';

const { data, error, loading } = useRequest(service)
```

### useRequest 说明
待更新