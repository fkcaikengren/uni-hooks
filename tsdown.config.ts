import type { Format, Options, UserConfig } from 'tsdown'
import { globSync } from 'tinyglobby'
import type { PackageManifest } from './scripts/utils.ts'

const externals = [
  'vue',
  '@dcloudio/uni-app'
]



// Monorepo的子包统一调用该方法生成tsdown.config配置
export function createTsDownConfig(
  pkg: PackageManifest,
  copy?: Options['copy'],
  cwd = process.cwd(),
) {
  const { globals, external, submodules, iife, build, mjs, dts, target = 'es2018' } = pkg

  if (build === false)
    return []

  const iifeName = 'UniHooks'
  const iifeGlobals = { //iife 格式的全局变量映射
    'vue': 'Vue',
    ...(globals || {}),
  }

  const format: Format[] = []
  // 生成esm格式
  if (mjs !== false) {
    format.push('es')
  }

  const baseConfig: UserConfig = {
    target,
    dts,  // 生成dts文件
    platform: 'browser',
    external: [
      ...externals,
      ...(external || []),
    ],
  }

  const configs: UserConfig[] = []

  const functionNames = ['index']
  if (submodules) {
    functionNames.push(...globSync(
      '*/index.ts',
      { cwd },
    ).map(i => i.split('/')[0]))
  }

  const entry: Record<string, string> = {}

  for (const fn of functionNames) {
    const fnEntry = {
      [fn]: fn === 'index' ? 'index.ts' : `${fn}/index.ts`,
    }

    // 生成 iife 格式
    if (iife !== false) {
      const BASE_IIFE_CONFIG: UserConfig = {
        ...baseConfig,
        entry: fnEntry,
        format: 'iife',
        globalName: iifeName,
        outputOptions: {
          extend: true,
          globals: iifeGlobals,
        },
      }

      configs.push(
        BASE_IIFE_CONFIG,
        {
          ...BASE_IIFE_CONFIG,
          minify: true,
          outExtensions: () => ({
            js: '.min.js',
          }),
        },
      )
    }

    Object.assign(entry, fnEntry)

  }

  configs.push({
    ...baseConfig,
    entry,
    format,
    copy,
  })

  return configs
}
