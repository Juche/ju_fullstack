# node cli

> npm run 本质上就是基于 npm 启动 scripts 配置的系统指令
> 但是 npm run 指令有局限性,不能在当前项目根路径以外运行

```sh
# 创建 cli 包文件夹
mkdir cli
cd cli

# 初始化配置文件
pnpm init
# 修改 package.json 文件,添加 bin 配置
"bin": { # 脚本文件必须在当前包文件夹内
  "node-cli": "index.js",
  "shell-cli": "index.sh"
},

# 将指定模块注册到本地仓库
pnpm link ./packages/cli # 使用相对路径
# 卸载指定模块 `pnpm unlink ./packages/cli`

# 注册模块后就可在项目下的任意路径下运行配置的 bin 脚本
pnpm node-cli
pnpm shell-cli
```
