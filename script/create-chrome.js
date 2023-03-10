import path from "path";
import chalk from "chalk";
import { fileURLToPath } from 'url'
import { cpSync, readFileSync, writeFileSync } from 'fs'

const appPath = path.join(fileURLToPath(import.meta.url), "../../");
console.log()
console.log(chalk.gray("开始创建chrome插件"))

// 插件模板路径
const templateSrc = path.join(appPath, "./chrome-template")
// 插件目标路径
const targetUrl = path.join(appPath, "./dist-chrome")

// 复制
cpSync(templateSrc, targetUrl, { recursive: true })

console.log(chalk.gray("正在设置相关配置..."))

// manifest.json文件路径
const manifestUrl = path.join(appPath, "./chrome-template/manifest.json")
// package.json文件路径
const packageJsonUrl = path.join(appPath, "./package.json")

let manifestContent = readFileSync(manifestUrl, 'utf-8')
let manifest = JSON.parse(manifestContent)

let packageJsonContent = readFileSync(packageJsonUrl, 'utf-8')
let packageJson = JSON.parse(packageJsonContent)

// 同步版本号
manifest.version = packageJson.version
writeFileSync(path.join(targetUrl, "./manifest.json"), JSON.stringify(manifest, "", "  "))


const configFileUrl = path.join(appPath, "./dist/create-form-table-config.user.js")
const configTargetFileUrl = path.join(appPath, "./dist-chrome/create-form-table-config.user.js")

// 配置只能在指定网页下展示
let configTargetContent = readFileSync(configFileUrl, 'utf-8')
const configCode = `if (document.location.hostname === "rp.mockplus.cn") { ${configTargetContent} }`
// 将设置好的js文件写入文件夹内
writeFileSync(configTargetFileUrl, configTargetContent)

console.log(`${chalk.green("创建成功")} ${chalk.bgBlue(` 版本号为 v${manifest.version} `)}`)
console.log()