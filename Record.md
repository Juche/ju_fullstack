# 开发记录

## 项目结构划分

```sh
├── docs        # 文档
├── packages    # 本地公共包
│   └── cli
├── projects
│   ├── admin   # 管理端
│   ├── client  # 客户端
│   └── server  # 服务端
└── scripts     # 公共脚本
    ├── node
    └── shell
```

## TODO

- [ ] 项目组织结构规划
- [ ] pnpm mono repo 项目管理配置
- [ ] 项目规范 & 工具选型
  - [ ] pm2
- [ ] node 后端库选型
  - [ ] Express
  - [ ] Koa
  - [ ] Nest
  - [ ] Egg => 基于 Koa
  - [ ] midway => sever less
  <!-- - [-] Meteor -->
- [ ] 前端各端的项目搭建
  - [ ] Vue3 + 全家桶 => 浏览器
  - [ ] Nuxt(Vue SSR) => 服务端渲染
  - [ ] VitePress => 静态站点(文档/博客)
  - [ ] UniApp + Vue2 => 浏览器(兼容旧版) / 小程序 / Android / IOS
  - [ ] Flutter => Windows / MacOS / Linux / Android / IOS
  - [ ] Tauri => Windows / MacOS / Linux / Android / IOS

---

## 搭建基板

- Eslint

```js
// 项目中配置了Eslint，但是不生效
// 链接：https://juejin.cn/post/7244070072787501112

// 手动检查 pnpm lint
// "lint": "eslint --ext .ts,.tsx,.vue,.js,.jsx packages projects --fix"

// 错误的原因:
项目的 package.json 文件中定义了 "type": "module"，这使得Node.js将所有 .js 文件都视为 ES 模块。但是 ESLint 目前只能处理 CommonJS 格式的配置文件（.eslintrc.cjs 或 .eslintrc.js 文件），并且在这种情况下无法加载 ES 模块格式的配置文件（.eslintrc.js 文件）

// 解决方法:
// 0. 直接去除 "type": "module" 即可达到目的 => 会影响 `simple-git-hooks`
1. 重命名配置文件：将 .eslintrc.js 文件重命名为 .eslintrc.cjs。
// 2. 改变 package.json 文件中的 type 属性：可以在 package.json 文件中将 "type": "module" 更改为 "type": "commonjs"，使得 Node.js 将所有 .js 文件视为 CommonJS 模块。但是这会影响到项目中的所有 .js 文件，可能会带来其他问题。
// 3. 使用动态 import() 语法：虽然这不直接适用于当前问题，但在其他地方使用 require() 加载 ES 模块时，可以将 require() 更改为 import()。
```

- [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks#readme)

```sh
# 问题: git commit 并未触发钩子
# 运行 CLI 脚本以使用配置中的命令更新 git 钩子：

# [Optional] These 2 steps can be skipped for non-husky users
git config core.hooksPath .git/hooks/
rm -rf .git/hooks

# Update ./git/hooks
npx simple-git-hooks
```
