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

## 技术选型

- nuxt(vue)
- next(react)
- solid
- **Koa** / Express / Nest / Fastify  / qwik
- astro: 目标是构建内容（静态网站），而不是web APP级别的应用, 可以同时写React、Vue、Svelte、SolidJS等多种语言的框架, 支持 SSR 和 SSG
- Prisma: 提供一套简洁的 API, 使你更加方便地操作数据库和理解查询语句,支持 PostgreSQL、MySQL、SQL Server、SQLite、MongoDB 和 CockroachDB

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
