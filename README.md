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
- **Koa** / Express / Nest / Fastify / astro/ solid / qwik

## 项目结构

```sh
.
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

---

## 其他问题

- Linux 子系统 ip 变化的问题 => `ip addr` 结合脚本

## 技术名词

- 客户端渲染 CSR（Client Side Rendering）
- 服务器端渲染 SSR（Server Side Rendering）
- 静态网站生成器 SSG（Static Site Generator）
- 递增静态再生 ISR（Incremental Static Regeneration）
