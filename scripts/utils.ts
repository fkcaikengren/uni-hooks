import type { UserConfig } from 'tsdown'
import { readFileSync } from 'fs'
import { resolve } from 'path'


export interface PackageManifest {
  globals?: Record<string, string>
  external?: (string | RegExp)[]
  submodules?: boolean
  iife?: boolean
  build?: boolean
  mjs?: boolean
  dts?: UserConfig['dts']  // boolean | DtsOptions
  target?: UserConfig['target']  //转译的es目标版本
}


export function buildPackageManifest(packageJsonPath: string): PackageManifest {
  try {
    const fullPath = resolve(packageJsonPath)
    const packageJson = JSON.parse(readFileSync(fullPath, 'utf-8'))
    
    // 从 package.json 中提取相关字段构建 PackageManifest
    const manifest: PackageManifest = {}
    
    // 如果 package.json 中有 uni-hooks 相关的构建配置，可以在这里解析
    // 例如：
    if (packageJson.customPackageConfig) {
      Object.assign(manifest, packageJson.customPackageConfig)
    }
    
    // 不打包进产物，视为外部依赖
    if (packageJson.peerDependencies || packageJson.dependencies) {
      const externalDeps = {
        ...packageJson.peerDependencies,
        ...packageJson.dependencies
      }
      
      manifest.external = Object.keys(externalDeps).map(dep => {
        return dep
      })
    }
    
    // 设置默认构建选项
    if (manifest.build === undefined) {
      manifest.build = true
    }
    
    if (manifest.mjs === undefined) {
      manifest.mjs = true
    }
    
    if (manifest.iife === undefined) {
      manifest.iife = true
    }
    
    if (manifest.submodules === undefined) {
      // 根据包结构决定是否启用子模块
      manifest.submodules = true
    }
    
    return manifest
  } catch (error) {
    console.error(`读取 package.json 失败: ${packageJsonPath}`, error)
    // 返回默认配置
    return {
      build: true,
      mjs: true,
      iife: true,
      submodules: true,
      external: ['vue', '@dcloudio/uni-app']
    }
  }
}