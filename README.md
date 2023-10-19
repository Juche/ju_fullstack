# ju_fullstack

## 全栈实践大纲

- [ ] git 项目管理
- [ ] Node 后端
- [ ] 服务端渲染
- [ ] 微服务
- [?] 微前端
- [ ] mock
- [ ] 测试
- [ ] 脚本
- [ ] 数据库
  - [ ] Mysql
  - [ ] GraphQL
- [ ] 工程化 & 部署
  - [ ] nginx
  - [ ] pm2
  - [ ] 持续集成
  <!-- - [ ]  -->

<!-- 开发环境，你得起个服务去调试代码吧
支持按需引入，应该没有人愿意全量导入组件库把
组件库编译，生成umd和esm模块的组件代码
构建开发文档，至少得有个中文文档说明一下组件怎么用吧
单元测试，你写的代码得信的过吧
桌面端和移动端的组件预览，你得让使用者看到组件具体长什么样子吧
代码格式化和规范检测工具，毕竟是团队作案，没有规矩不成方圆
自动化的文档部署和测试流程，总不能每次发布版本都手动去部署文档和测试吧 -->

## 技术选型

- FE
  - [solid]
  - [Headless UI]

- SSR/SSG
  - [nuxt(vue)]
  - [next/Remix(react)]
  - [qwik]
  - [Partytown] is a lazy-loaded library to help relocate resource intensive scripts into a web worker, and off of the main thread. Its goal is to help speed up sites by dedicating the main thread to your code, and offloading third-party scripts to a web worker.

  - [astro(Islands架构)]: 目标是构建内容（静态网站），而不是web APP级别的应用, 可以同时写React、Vue、Svelte、SolidJS等多种语言的框架, 支持 SSR 和 SSG
  - [VitePress]
  - [Slidev]

- BE
  - [Nest / **Koa** / Express / egg / Fastify]

- DB
  - [GraphQL]
  - [Prisma]: 提供一套简洁的 API, 使你更加方便地操作数据库和理解查询语句,支持 PostgreSQL、MySQL、SQL Server、SQLite、MongoDB 和 CockroachDB

- Utils
  - [RxJS]: 是一个通过使用可观察序列来编写异步和基于事件的程序的库,将 RxJS 视为事件的 Lodash
  - [Lodash]
  - [VueUse]

- Test
  - [Vitest]

- Tools
  - [nvm => volta]: 等正式支持 pnpm

- Others
  - unocss | TailWind
  - css-doodle: 组合有趣的视觉效果
  - fancy-components: 几个效果酷炫的 web component 组件
  - <https://fancy-components.github.io/#/>
  - <https://juejin.cn/post/7013247812628381704>
  - <https://juejin.cn/post/7012564452545396750>
  - Varlet: 基于 Vue3 开发的 Material 风格移动端组件库
  - dnd-kit: React 生态的 drag and drop 工具

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

  - [ ] node 脚本

### 初始化项目

- 在 `projects` 里分别创建 `admin` `client` `server` 三个项目
- 在项目下分别运行 `pnpm init` 初始化项目
- [ ] monorepo

#### server

- 添加依赖 `pnpm i koa`

---

## 其他问题

- Linux 子系统 ip 变化的问题 => `ip addr` 结合脚本

```js
import { networkInterfaces, type } from 'node:os'

const netInfo = networkInterfaces() //网络信息
const ip = netInfo.eth0[0].address // Linux 系统下
```

## 技术名词

- 客户端渲染 CSR（Client Side Rendering）
- 服务器端渲染 SSR（Server Side Rendering）
- 静态网站生成器 SSG（Static Site Generator）
- 递增静态再生 ISR（Incremental Static Regeneration）

## 整理中

### prettier eslint 配置

> [Hacking Semicolons](https://slides.com/evanyou/semicolons)

### vue 项目测试用例

### vue hooks

### node full stack

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

### 其他

- 学习一个细分 & 小众方向
- git
  pro git
  submodule
  sparse index
  git sparse checkout
  git LFS

- Deno / Node / Bun
- Rust 前端生态
  - WebAssembly
  - Tauri
  - Yew
- Rust / Dart
- Tauri / Flutter
