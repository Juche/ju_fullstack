# ju_fullstack

## 全栈实践大纲

- [ ] 项目管理
  - [ ] git/pnpm & monorepo
  - [ ] changesets/conventional-changelog-cli/commitizen & cz-conventional-changelog/simple-git-hooks/husky
  - [ ] create-project(参考 create-vite)
- [ ] 前端
  - [ ] 微前端 QianKun/Micro App
  - [ ] Vue
  - [ ] SPA/MPA/SSR/SSG
  - [ ] nuxt/astro/VitePress/Slidev
  - [ ] 工具: VueUse/RxJS/Lodash/localForage/pinia
  - [ ] Layout system/PWA/I18n/iconify/env
  - [ ] 状态页/列表页/表格页/tab页/弹窗页/loading/placeholder
  - [ ] Hash/History
  - [ ] web Component
  - [ ] sass/unocss/TailWind/PostCss
- [ ] 跨平台
  - [ ] UniApp
  - [ ] Flutter
  - [ ] Rust 前端生态
    - WebAssembly
    - Tauri
    - Yew
- [ ] 后端
  - [ ] node/spring boot
  - [ ] Nest/Koa/Express/egg/Fastify
  - [ ] 微服务
  - [ ] 数据库: Mysql/PostgreSQL
  - [ ] Prisma
  - [ ] GraphQL
- [ ] 工程化 & 部署
  - [ ] nvm => volta: 等正式支持 pnpm
  - [ ] mock
  - [ ] 测试 Vitest
  - [ ] nginx
  - [ ] pm2
  - [ ] 脚本
    - [create-vite](https://github.com/vitejs/vite/blob/main/packages/create-vite/src/index.ts)
  - [ ] CI/CD
  - [ ] Git Hook 工具：husky + lint-staged
  - [ ] 代码规范：EditorConfig + Prettier + ESLint
  - [ ] 提交规范：Commitizen + Commitlint

## 项目结构

```sh
.
├── docs        # 文档
├── packages    # 本地公共包
├── projects
│   ├── vue-admin
│   ├── vue-h5
│   ├── flutter
│   ├── tauri
│   ├── uni-app
│   ├── electron
│   └── node-server
└── scripts     # 公共脚本
    ├── cli
    ├── node
    └── shell
```

## 项目记录

### 初始化代码仓库

- [x] 初始代码仓库
- [x] 仓库用户信息配置
  - [x] shell 脚本

  ```sh
  git config user.name "juche"
  git config user.email "azhucheng1@qq.com"
  ```

### 初始化项目

- 在 `projects` 里分别创建 `admin` `client` `server` 三个项目
- 在项目下分别运行 `pnpm init` 初始化项目

### 搭建一个全栈项目

- ju_fullstack

  - [ ] 项目管理 pnpm mono repo

  - [ ] be
    - [ ] 数据库
    - [ ] 网络服务
      - [ ] 动态获取 IP (需补充 Mac 平台)
  - [ ] fe
    - [ ] 跨平台(electron/flutter/uni-app...)
      - [ ] 浏览器、iOS、Android、MacOS、Linux、小程序、麒麟、UOS、TV、车载、鸿蒙?.....
      - [ ] **Flutter** / **Tauri** / Taro / React Native / Weex / Rax / **Electron** / Ionic / **UniApp** / Finclip
    - [ ] 管理端 & 移动端(兼容旧版 => uni-app 套件)
    - [ ] 管理端 & 移动端(现代浏览器 => vue 套件)
      - [ ] 从 0 开始搭建一套 vue + vite + ts 项目
      - [ ] 脚手架 `pnpm create XXX --xxx xxx`
      - [ ] vue 全家桶 vue3/vue-route/pinia/vueuse
        - [ ] SPA/MPA
        - [ ] SSR
        - [ ] Hash/History
        - [ ] layout
        - [ ] 封装 Axios & Fetch
      - [ ] 其他工具/库
        - [ ] ts
        - [ ] ant-design-vue
        - [ ] Less/Scss/Tailwind
      - [ ] 构建工具 vite
      - [ ] 工作流
        - [ ] 测试 vitest + codeQl
        - [ ] 网络 proxy
        - [ ] mock
        - [ ] husky + lint-staged + eslint + prettier
        - [ ] 代码检查 => ESLint(使用什么规范)
        - [ ] 代码格式化 => 项目内配置文件
        - [ ] 项目运维：代码管理、构建管理(构建选择)、项目部署、监控告警
        - [ ] CI/CD
      - [ ] theme
      - [ ] i18n
      - [ ] env(全局项目公用)
      - [ ] 通用开发优化
        - [ ] 页面配置化
        - [ ] 路由自动注册
        - [ ] 自动注册 Svg 图标
        - [ ] 插件/组件 => npm
        - [ ] 指令/工具
      - [ ] 通用交互优化
        - [ ] 页面/表格/统计数据等 loading
        - [ ] 常用状态页: 404
        - [ ] 视图空占位
        - [ ] 提交/保存/提交等按钮的状态锁
      - [ ] 项目资源
        - [ ] styles
        - [ ] utils
          - [ ] 按功能分类分文件拆分
        - [ ] hooks
        - [ ] components
        - [ ] plugins
        - [ ] iconFont

### 热门 vue & node 项目参考

## 代码提交规范

'feat', // 新功能 feature
'fix', // 修复 bug
'docs', // 文档注释
'style', // 代码格式(不影响代码运行的变动)
'refactor', // 重构(既不增加新功能，也不是修复bug)
'perf', // 性能优化
'test', // 增加测试
'chore', // 构建过程或辅助工具的变动
'revert', // 回退
'build' // 打包
'ci' // 持续集成相关

## 技术名词

- 客户端渲染 CSR（Client Side Rendering）
- 服务器端渲染 SSR（Server Side Rendering）
- 静态网站生成器 SSG（Static Site Generator）
- 递增静态再生 ISR（Incremental Static Regeneration）

## 其他

- prettier eslint 配置

> [Hacking Semicolons](https://slides.com/evanyou/semicolons)

- Linux 子系统 ip 变化的问题 => `ip addr` 结合脚本

```js
import { networkInterfaces, type } from 'node:os'

const netInfo = networkInterfaces() //网络信息
const ip = netInfo.eth0[0].address // Linux 系统下
```

- 学习一个细分 & 小众方向
- git
  pro git
  submodule
  sparse index
  git sparse checkout
  git LFS

- Deno / Node / Bun

- [ ] 微前端
  - 方案
    - Nginx配置不同应用的转发
    - iframe(天然隔离)
    - Web Components
    - 组合式应用路由分发
  - 主应用(基座)解决的问题
    - 路由切换的分发问题
    - 主微应用的隔离问题
      - js: 通常在Node.js端可以采用vm模块，而对于浏览器，则需要结合with关键字和window.Proxy对象来实现浏览器端的沙箱。
      - css: CSS Module 或者命名空间(postcss插件打包)
    - 通信问题: 中间媒介或者说全局对象,消息订阅（pub/sub）模式的通信机制

- FE
  - solid
  - Headless UI

- SSR/SSG
  - nuxt(vue)
  - next/Remix(react)
  - qwik
  - Partytown is a lazy-loaded library to help relocate resource intensive scripts into a web worker, and off of the main thread. Its goal is to help speed up sites by dedicating the main thread to your code, and offloading third-party scripts to a web worker.

  - [astro(Islands架构)]: 目标是构建内容（静态网站），而不是web APP级别的应用, 可以同时写React、Vue、Svelte、SolidJS等多种语言的框架, 支持 SSR 和 SSG
  - VitePress
  - Slidev

- BE
  - [Nest]
  - Koa
  - Express
  - egg
  - Fastify

- DB
  - [GraphQL]
  - [Prisma]: 提供一套简洁的 API, 使你更加方便地操作数据库和理解查询语句,支持 PostgreSQL、MySQL、SQL Server、SQLite、MongoDB 和 CockroachDB
  - [localForage]

- Utils
  - [RxJS]: 是一个通过使用可观察序列来编写异步和基于事件的程序的库,将 RxJS 视为事件的 Lodash
  - Lodash
  - [VueUse]

- Test
  - [Vitest]

- Tools
  - [nvm => volta]: 等正式支持 pnpm

- 微服务
  - Qiankun
  - [Micro App]
  - <https://juejin.cn/post/7236021829000691771>
  - <https://www.zhihu.com/question/338082919>

- Others
  - [pnpm + changesets]
  - unocss | TailWind
  - css-doodle: 组合有趣的视觉效果
  - fancy-components: 几个效果酷炫的 web component 组件
  - <https://fancy-components.github.io/#/>
  - <https://juejin.cn/post/7013247812628381704>
  - <https://juejin.cn/post/7012564452545396750>
  - Varlet: 基于 Vue3 开发的 Material 风格移动端组件库
  - dnd-kit: React 生态的 drag and drop 工具
  - CI/CD
  - Git Hook 工具：husky + lint-staged
  - 代码规范：EditorConfig + Prettier + ESLint
  - 提交规范：Commitizen + Commitlint
