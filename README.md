<div align="center">

# uni-hooks

为 uni-app 与 Vue 3 打造的现代化 Hooks 库与请求工具集。

[![NPM Version](https://img.shields.io/npm/v/@caikengren/uni-hooks?label=@caikengren/uni-hooks)](https://www.npmjs.com/package/@caikengren/uni-hooks)
[![NPM Version](https://img.shields.io/npm/v/@caikengren/uni-use-request?label=@caikengren/uni-use-request)](https://www.npmjs.com/package/@caikengren/uni-use-request)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Stars](https://img.shields.io/github/stars/fkcaikengren/uni-hooks?style=social)](https://github.com/fkcaikengren/uni-hooks)

</div>

---

一个以开发者体验为先的前端 npm 项目，采用 Monorepo 管理，专注于：

- 在 uni-app 多端环境下提供稳定、类型安全的通用 Hooks
- 高扩展性的 `useRequest` 请求能力，内置轮询、缓存、重试、防抖、节流等插件
- 完整的文档与示例 Playground，便于快速上手与验证

## 特性

- 提供常用的兼容小程序和h5的hooks，如`useBoolean`、`useRoute`、`usePageScroll`和`useList`等，
- 统一设计：共享工具与类型放在 `uni-hooks-shared`，避免重复实现
- 插件化请求：`useRequest` 支持缓存、轮询、重试、节流、防抖、延迟 Loading、DevTools 等
- 类型友好：全面的 `d.ts` 输出与泛型支持
- 文档友好：内置 VitePress 文档与 Typedoc API 说明

## 安装

项目使用 `pnpm` 管理依赖，Node 版本需 `>= 20`。

```bash
# 在你的 uni-app 项目中安装
pnpm add @caikengren/uni-hooks

```

如果你只需要使用`useRequest`，可以单独安装：
```bash
pnpm add @caikengren/uni-use-request
```

## 快速上手

使用一个简单的状态 Hook：

```ts
import { useBoolean } from '@caikengren/uni-hooks'

const [visible, { toggle, set }] = useBoolean(false)

toggle()
set(true)
```

在页面中读取路由与滚动：

```ts
import { usePageScroll, useRoute } from '@caikengren/uni-hooks'

const route = useRoute()
const { y } = usePageScroll()
```

请求示例（含缓存与轮询）：

```ts
import { useRequest } from '@caikengren/uni-hooks'

const { data, loading, run, cancel } = useRequest(
  async () => {
    const res = await uni.request({ url: 'https://api.example.com/list' })
    return res.data
  },
  {
    pollingInterval: 5000,
    cacheKey: 'list',
    retryCount: 2,
  },
)

run()
```

更多用法请查看文档与示例。

## Monorepo 结构

```
.
├─ packages
│  ├─ uni-hooks            # 通用业务 Hooks
│  ├─ uni-hooks-shared     # 共享工具与基础能力
│  └─ uni-use-request      # 请求相关 Hooks 与插件
├─ docs                    # 文档站（VitePress + Typedoc）
└─ playground              # 示例项目（uni-app）
```

## 开发与文档

先全局安装工具 (后续可以使用ni, nr等命令)
```bash
npm install -g @antfu/ni
```

```bash
# 安装依赖
nr i

# 启动 Playground（H5）
nr dev:h5

# 启动 Playground（微信小程序）
nr dev:mp

# 构建所有子包
nr build

# 基于typedoc生成文档
nr docs:gen

# 启动文档站
nr docs:dev

```

## 使用指南

- 包均为 ESM，入口与导出统一为 `dist/index.js` 与 `dist/index.d.ts`
- 运行时外部依赖通过 `peerDependencies` 管理：`vue`、`@dcloudio/uni-app`
- 构建工具使用 `tsdown`，统一生成 `es` 与 `iife` 产物（含 `.min.js`）
- 类型与工具共享自 `@caikengren/uni-hooks-shared`

## 部分 Hooks 一览

- `useBoolean`：布尔状态管理
- `useStorage` / `useStorageSync`：本地存储读写
- `useRoute`：统一的路由读取
- `usePageScroll` / `usePageVisibility`：页面滚动与可见性
- `useDebounceFn` / `useThrottleFn`：防抖与节流方法
- `onPageShow` / `onPageHide`：页面生命周期封装

完整列表与 API 请见[文档](https://fkcaikengren.github.io/uni-hooks)

## useRequest 能力

- 插件支持：缓存、轮询、重试、防抖、节流、延迟 Loading、DevTools
- 数据源复用：同 `cacheKey` 自动共享与取消订阅
- 类型安全：`data`/`error` 均有完善类型推导

## 测试

- 测试框架：`vitest`
- 浏览器相关：`vitest-browser-vue` + `playwright`
- 根级命令：`nr test`

## 贡献

- 提交前建议运行 `nr lint` 与 `nr test`
- 欢迎通过 Issue 或 PR 参与贡献

## 许可证

MIT

## 致谢

- 参考与灵感来源：`vueuse`、`uni-use`、`vue-hooks-plus`
