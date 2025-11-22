import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vitepress'

function getFunctionItems(section: 'hooks' | 'shared' | 'use-request') {
  const cwd = process.cwd()
  const dir = path.resolve(cwd, 'docs', 'hooks', section, 'functions')
  if (!fs.existsSync(dir))
    return []
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))
  return files.map((f) => {
    const name = path.basename(f, '.md')
    return { text: name, link: `/hooks/${section}/functions/${name}` }
  })
}

export default defineConfig({
  base: '/uni-hooks/',
  title: 'uni-hooks',
  description: 'Vue hooks for uni-app',
  themeConfig: {
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Hooks', link: '/hooks/hooks/' },
    ],
    sidebar: {
      '/guide/': [{ text: 'Introduction', link: '/guide/' }],
      '/hooks/': [
        {
          text: 'Hooks',
          items: [{ text: 'Overview', link: '/hooks/hooks/' }, ...getFunctionItems('hooks')],
        },
        {
          text: 'Shared',
          items: [{ text: 'Overview', link: '/hooks/shared/' }, ...getFunctionItems('shared')],
        },
        {
          text: 'Use Request',
          items: [{ text: 'Overview', link: '/hooks/use-request/' }, ...getFunctionItems('use-request')],
        },
      ],
    },
  },
})
