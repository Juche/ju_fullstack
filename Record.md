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

## 待办

- [ ] 项目组织结构规划
- [ ] pnpm mono repo 项目管理配置
- [ ] 项目规范 & 工具选型
- [ ] node 后端库选型
- [ ] 前端各端的项目搭建
  - [ ] Vue3 + 全家桶 => 浏览器
  - [ ] Nuxt(Vue SSR) => 服务端渲染
  - [ ] VitePress => 静态站点(文档/博客)
  - [ ] UniApp + Vue2 => 浏览器(兼容旧版) / 小程序 / Android / IOS
  - [ ] Flutter => Windows / MacOS / Linux / Android / IOS
  - [ ] Tauri => Windows / MacOS / Linux / Android / IOS
