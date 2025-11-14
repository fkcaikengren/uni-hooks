## 目标
- 使用 Typedoc + typedoc-plugin-markdown，基于源码注释自动生成 VitePress 文档。
- 输出结构分为三大部分：hooks、shared、use-request，分别对应三个子包。
- 在根级统一新增脚本，一键生成与构建文档，融入现有 `docs:dev`/`docs:build` 流程。

## 依赖安装
- 在根 `package.json` 添加开发依赖：
  - `typedoc`
  - `typedoc-plugin-markdown`
- 使用 `pnpm i -D typedoc typedoc-plugin-markdown` 安装。

## 配置方案
- 在仓库根新增 `typedoc.json`（统一基础配置）：
```json
{
  "plugin": ["typedoc-plugin-markdown"],
  "entryPointStrategy": "resolve",
  "hideBreadcrumbs": true,
  "hideInPageTOC": false,
  "excludePrivate": true,
  "excludeInternal": true,
  "readme": "none",
  "cleanOutputDir": true,
  "parametersFormat": "table",
  "entryDocument": "index.md"
}
```
- 采用“按包入口分别生成”的策略：每次调用传入不同 `entryPoints` 与 `out`。
  - hooks：`packages/uni-hooks/index.ts`
  - shared：`packages/uni-hooks-shared/index.ts`
  - use-request：`packages/uni-use-request/index.ts`
- 说明：直接使用物理入口路径，规避根 `tsconfig` 中旧别名带来的解析偏差。

## 输出目录
- `docs/api/hooks/`
- `docs/api/shared/`
- `docs/api/use-request/`
- 每个目录生成一个 `index.md`（模块/导出总览）与对应符号页面。

## VitePress 配置
- 更新 `docs/.vitepress/config.ts`：
  - `themeConfig.nav` 下的 `API` 指向 `/api/` 或默认跳转到 `/api/hooks/`。
  - 完善 `themeConfig.sidebar['/api/']`，增加三组分区：
```ts
sidebar: {
  '/api/': [
    {
      text: 'Hooks',
      items: [
        { text: 'Overview', link: '/api/hooks/' }
      ]
    },
    {
      text: 'Shared',
      items: [
        { text: 'Overview', link: '/api/shared/' }
      ]
    },
    {
      text: 'Use Request',
      items: [
        { text: 'Overview', link: '/api/use-request/' }
      ]
    }
  ]
}
```
- 后续可按需要补充到具体符号页的链接（Typedoc生成后可见具体路径）。

## 脚本设计（根级 `package.json`）
- 新增：
```json
{
  "scripts": {
    "docs:gen:hooks": "typedoc --options typedoc.json --entryPoints packages/uni-hooks/index.ts --out docs/api/hooks",
    "docs:gen:shared": "typedoc --options typedoc.json --entryPoints packages/uni-hooks-shared/index.ts --out docs/api/shared",
    "docs:gen:use-request": "typedoc --options typedoc.json --entryPoints packages/uni-use-request/index.ts --out docs/api/use-request",
    "docs:gen": "pnpm -r run docs:gen:hooks && pnpm -r run docs:gen:shared && pnpm -r run docs:gen:use-request",
    "docs:clean": "rimraf docs/api/hooks docs/api/shared docs/api/use-request",
    "docs:dev": "pnpm docs:gen && vitepress dev docs",
    "docs:build": "pnpm docs:gen && vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```
- 若仓库未安装 `rimraf`，可改用 `node -e` 或保留 `docs:clean` 为可选。

## 验证流程
- 生成文档：`pnpm docs:gen`，检查 `docs/api/*` 三目录生成的 Markdown。
- 本地预览：`pnpm docs:dev`，确认侧边栏分区与页面结构正确、跳转有效。
- 构建发布预览：`pnpm docs:build` 与 `pnpm docs:preview`，确保构建产物正常。

## 约束与注意
- 三子包 ESM-only；Typedoc 面向源码注释解析，与 `tsdown` 构建链独立。
- 排除 `private/internal` 符号，文档面向公共 API；如需调整可在 `typedoc.json` 修改。
- 若后续修正根 `tsconfig`/`vitest.config` 中旧别名，Typedoc 入口仍建议保持物理路径以减少耦合。

## 交付物
- 新增 `typedoc.json` 基础配置。
- 更新根 `package.json` 脚本。
- 更新 `docs/.vitepress/config.ts` 侧边栏（与必要导航项）。
- 不改动子包脚本与构建，最小化变更范围。