// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // ============================================================
    // 1. 全局功能配置 (Options)
    // ============================================================
    
    // 显式启用/禁用特定框架支持（默认会自动检测，但显式写出更清晰）
    react: true,
    vue: true,
    typescript: true,

    // 格式化风格配置 (替代 Prettier)
    stylistic: {
      indent: 2, // 缩进 2 空格
      quotes: 'single', // 单引号
      jsx: true, // 支持 JSX
    },

    // 忽略文件 (相当于 .eslintignore)
    ignores: [
      '**/fixtures',
      'dist',
      'public',
      // ...其他需要忽略的文件
    ],
  },
  
  // ============================================================
  // 2. 具体规则覆盖 (Overrides)
  // ============================================================
  
  // 一般性规则覆盖
  {
    rules: {
      // 允许使用 console.log (默认是 warn 或 error)
      'no-console': 'off',
      
      // 允许使用未使用的变量 (通常用于解构时忽略某些属性)
      'unused-imports/no-unused-vars': 'warn',
      
      // 如果你真的想要分号 (虽然 antfu 默认是无分号的)
      // 'style/semi': ['error', 'always'],
    },
  },

  // 针对特定文件的规则覆盖
  {
    files: ['**/*.vue'],
    rules: {
      // Vue 组件名必须由多个单词组成？关掉它
      'vue/multi-word-component-names': 'off',
    },
  },
  
  {
    files: ['**/*.json'],
    rules: {
      // 允许 JSON 文件末尾有逗号 (某些工具不支持，可能需要关掉)
      'jsonc/comma-dangle': 'off',
    },
  }
)