import { execSync } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { stdin as input, stdout as output } from 'node:process'
import { createInterface } from 'node:readline/promises'

function run(cmd: string) {
  execSync(cmd, { stdio: 'inherit' })
}

async function main(){

  try {
    const rootPkgUrl = new URL('../package.json', import.meta.url)
    const pkg = JSON.parse(await readFile(rootPkgUrl, 'utf8'))
    const oldVersion = pkg.version
    const rl = createInterface({ input, output })
    const answer = await rl.question(`请输入发布版本（当前是 ${oldVersion}）: `)
    await rl.close()
    if (!/^\d+\.\d+\.\d+(-(beta|alpha)\.\d+)?$/.test(answer)) {
      // 不是是版本号（符合规范的版本号：1.2.3-beta.1, 1.0.0， 1.0.0）
      console.error('输入版本号不符合规范')
      process.exit(0)
    }
    const version = (answer || "1.0.0").trim();

    pkg.version = version
    await writeFile(rootPkgUrl, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8')


    run('nr build') // 这里直接打包（按标准CI，这里属于预检查）
    run('npx changeset publish') // P.S 这里在本地就发布了（按标准CI流程，这个publish应该push代码之后发布）
    run('git add .')
    run(`git commit -m "chore(release): v${version}"`)
    run(`git tag -a v${version} -m "chore(release): v${version}"`)
    run('git push --set-upstream origin release')
    run(`git push origin v${version}`)

    // 合并回到主分支，删除 release 分支
    run('git checkout main')
    run('git merge release')
    run('git push')
    run('git branch -d release')
    run('git push origin --delete release')
    run(`git tag -d v${version}`)

  } catch (e: any) {
    const code = typeof e?.status === 'number' ? e.status : 1
    process.exit(code)
  }

}

main();