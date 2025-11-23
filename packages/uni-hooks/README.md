# @caikengren/uni-hooks

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript) ![Dependencies](https://img.shields.io/librariesio/release/npm/@caikengren/uni-hooks?label=dependencies) ![License](https://img.shields.io/npm/l/@caikengren/uni-hooks)

Vue Hooks for uni-app：轻量、类型友好、面向 uni-app 的常用 hooks 集合。封装常用 uni 能力，统一 API，支持 H5 与小程序，提供完整 TypeScript 类型与 d.ts 输出。

**文档地址**：https://fkcaikengren.github.io/uni-hooks/

## Features
- 面向 uni-app 封装常用composables/hooks，统一 API，兼容 H5/小程序
- 全量 TypeScript 支持，类型健全，完善的 d.ts 输出
- 依赖精简，与 `vue`、`@dcloudio/uni-app` 解耦为 peerDependencies
- 工程化齐备：打包、测试、文档与 CI 完整
- 与 `@caikengren/uni-hooks-shared`、`@caikengren/uni-use-request` 协同使用

## Install
- pnpm：`pnpm add @caikengren/uni-hooks`
- npm：`npm i @caikengren/uni-hooks`
- yarn：`yarn add @caikengren/uni-hooks`

注意：本包声明以下 peer 依赖，请在项目中同时安装并保证版本匹配：
- `vue@^3.5.0`
- `@dcloudio/uni-app@^3.0.0`

## Usage
- 在任意 `setup()` 或组合式函数中使用；支持 H5 与小程序。

```ts
// src/pages/index.vue
<script setup lang="ts">
import { ref } from 'vue'
import { useStorage, usePageScroll } from '@caikengren/uni-hooks'

// 响应式持久化存储（自动读写 uni storage）
const count = useStorage('count', 0)
const inc = () => count.value++

// 滚动到选择器位置（H5 与小程序统一）
const { scrollToSelector } = usePageScroll({ duration: 300 })
</script>
```

更多示例与 API 请查阅文档：https://fkcaikengren.github.io/uni-hooks/

## License
MIT © Gavin Tang
