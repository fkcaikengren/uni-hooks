# uni-hooks 项目规则（Trae Rule）

## 项目概览
- Monorepo，包管理使用 `pnpm`，任务编排使用 `turbo`。
- 子包：
  - `packages/uni-hooks`：通用 hooks 集合。
  - `packages/uni-hooks-shared`：共享工具与基础能力。
  - `packages/uni-use-request`：请求相关 hooks。
- 子包下面`type.ts` 定义类型，避免循环依赖，共享类型定义在`packages/uni-hooks-shared/src/types.ts`。
- 文档站：`docs`（VitePress）。
- Playground：`playground`是一个uni-app项目（用于示例/演示）。

## 环境要求
- Node `>= 20`（CI 使用 Node 22.13.1）。
- `pnpm >= 9`（CI 中通过 `npm i -g pnpm@v10.6.2` 安装）。
- 全局安装建议：`turbo` 可通过项目依赖使用，无需全局安装。

## 安装与基础命令
- 安装依赖：`pnpm i`
- 安装某个依赖：`pnpm i -w [package]`
- 安装某个开发依赖：`pnpm i -wD [package]`
- 构建（全部子包）：
  - 推荐：`turbo run build`
  - 或：`pnpm run build`（脚本内部调用构建流水线）
- 单包构建（示例）：
  - `pnpm --filter @caikengren/uni-hooks run build`
  - `pnpm --filter @caikengren/uni-hooks-shared run build`
  - `pnpm --filter @caikengren/uni-use-request run build`
- 测试（根级别）：`pnpm test`
- 文档开发：`pnpm docs:dev`
- 文档构建与预览：
  - 构建：`pnpm docs:build`
  - 预览：`pnpm docs:preview`

## 代码组织与约束
- 包均为 ESM（`type: module`），入口与导出保持一致：
  - `main`/`module` 指向 `dist/index.js`；`types` 指向 `dist/index.d.ts`。
  - 使用 `exports` 暴露根与子模块（`"."` 与 `"./*"`）。
- 运行时外部依赖以 `peerDependencies` 约束：`vue`、`@dcloudio/uni-app`。
- 构建工具使用 `tsdown`，统一配置来源：
  - 子包 `tsdown.config.ts` 通过根方法 `createTsDownConfig` 生成配置。
  - 默认生成 `es` 与 `iife`（含 `.min.js`）。
- 共享能力放在 `packages/uni-hooks-shared`；与网络请求相关能力放在 `packages/uni-use-request`；通用业务 hooks 放在 `packages/uni-hooks`。

## Hooks 开发规范
- 新增 Hook 目录：`packages/hooks/src/<HookName>/index.ts`。
- 必须在 `packages/hooks/index.ts` 中导出该 Hook。
- 不使用默认导出；统一使用命名导出。
- 如需共享状态，优先通过已有的 `createSharedComposable` 等封装。
- 涉及 `uni` API 的使用需考虑跨端兼容与异常处理（如系统信息读取失败容错）。

## 文档规范（VitePress）
- 文档目录：`docs`。
- 指南首页与导航在 `docs/.vitepress/config.ts` 中维护。
- 变更涉及文档站 UI 或交互时，必须在开发阶段启动预览并提供可访问链接。
- 注释生成时，多个返回值，数组使用 `@returns [type1, type2]` , 对象使用 `@returns {{}}`

## 测试与验证
- 统一使用 `vitest`：根级配置在 `vitest.config.ts`。
- 测试策略：
  - 优先为改动的函数/模块添加或更新单元测试。
  - 先运行针对性测试，再补充运行全量测试，保证覆盖与稳定性。
- 浏览器相关测试使用 `vitest-browser-vue` 与 Playwright（已在根配置中设定）。

## 提交与变更原则
- 只做与任务相关的最小改动；不要顺手修复无关问题（可在备注中提示）。
- 不随意更改现有文件名/路径或对架构做大幅调整。
- 不添加版权或许可证头（除非明确要求）。
- 不进行 `git commit`/创建分支（除非用户明确要求）。

## 关键配置文件
- 根：`tsdown.config.ts`（统一生成构建配置）
- 子包：`packages/*/tsdown.config.ts`
- 测试：`vitest.config.ts`
- 工作空间：`pnpm-workspace.yaml`
- Turbo：`turbo.json`

## 依赖管理
- 子包对 `vue` 与 `@dcloudio/uni-app` 仅声明为 `peerDependencies`，避免重复打包。
- 内部依赖使用 `workspace:^` 互相引用，保持一致版本与联动构建。

## 在 Trae 中的协作建议
- 变更文件时使用补丁式修改；避免通过 shell 命令直接创建/写入文件，以免污染工作区。
- 对多步骤任务，先拆分明确步骤、逐步完成并实时汇报进度。
- 完成实现后，若任务可运行/可预览，务必运行相应命令验证并在总结中说明结果与产物位置。
