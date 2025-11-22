import { execSync } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { stdin as input, stdout as output } from 'node:process'
import { createInterface } from 'node:readline/promises'

const rootPkgUrl = new URL('../package.json', import.meta.url)
const pkg = JSON.parse(await readFile(rootPkgUrl, 'utf8'))
const defaultVersion = pkg.version
const rl = createInterface({ input, output })
const answer = await rl.question('请输入发布版本: ')
await rl.close()
const version = (answer || '').trim() || defaultVersion

pkg.version = version
await writeFile(rootPkgUrl, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8')
execSync('pnpm run build', { stdio: 'inherit' })
execSync('git add .', { stdio: 'inherit' })
execSync(`git commit -m "chore(release): ${version}"`, { stdio: 'inherit' })
execSync('npm publish', { stdio: 'inherit', cwd: new URL('.', dirUrl).pathname })
execSync(`git tag -a v${version} -m "chore(release): v${version}"`, { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
execSync(`git push origin v${version}`, { stdio: 'inherit' })
export {}
