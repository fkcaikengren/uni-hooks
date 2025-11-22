# 指南

uni-hooks 是一个面向 uni-app 的 hooks 工具库。

## 安装

```bash
pnpm add uni-hooks
```

## 使用示例

```ts
import { useQuery } from 'uni-hooks'

const { data, loading, refetch } = useQuery('user', async () => {
  // 在 uni 环境下可调用 uni.request
  return { id: 1, name: 'Jack' }
})
```
