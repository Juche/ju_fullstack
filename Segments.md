# 待整理片段

- 查看 pnpm 依赖包安装路径: `pnpm root -g`
- 查看 pnpm 执行文件路径: `pnpm config get prefix`
- 配置 pnpm 执行文件路径: `pnpm config set prefix 'C:\Users\User\AppData\Local\pnpm'`

- 体验优化

```js
// [页面载入进度条]
// 使用 nprogress 对路由跳转时做一个伪进度条，这样做在网络不好的情况下可以让用户知道页面已经在加载了：
import NProgress from 'nprogress';

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

// [美化滚动条]
// 一直用 Mac 做前端，突然发现同事的 Windows 上出现了十分丑陋的滚动条，为了保持一致：
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(#101F1C, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(#101F1C, 0.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(#101F1C, 1);
}

// [静态资源加载页面]
// 首次加载页面时，会产生大量的白屏时间，这时做一个 loading 效果看起来会很友好，其实很简单，直接在 public/index.html 里写一些静态的样式即可。

// [移动端 100vh 问题]
// 在移动端使用 100vh 时，发现在 Chrome、Safari 浏览器中，因为浏览器栏和一些导航栏、链接栏导致不一样的呈现：
// 你以为的 100vh === 视口高度
// 实际上 100vh === 视口高度 + 浏览器工具栏（地址栏等等）的高度
// 解决方案
// 安装 vh-check npm install vh-check --save
import vhCheck from 'vh-check';
vhCheck('browser-address-bar');

// 定义一个 CSS Mixin
@mixin vh($height: 100vh) {
  height: $height;
  height: calc(#{$height} - var(--browser-address-bar, 0px));
}

// [跨域问题]
// 跨域问题一般情况直接找后端解决了，你要是不好意思打扰他们的话，可以用 devServer 提供的 proxy 代理：
// vue.config.js
devServer: {
  proxy: {
    '/api': {
      target: 'http://47.100.186.132/your-path/api',
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}

// [Mock 数据]
// Mock 数据功能是基于 mock.js (opens new window)开发，通过 webpack 进行自动加载 mock 配置文件。

// 所有的 mock 配置文件均应放置在 @/mock/services 路径内。
// 在 @/mock/services 内部可以建立业务相关的文件夹分类存放配置文件。
// 所有的配置文件应按照 ***.mock.js 的命名规范创建。
// 配置文件使用 ES6 Module 导出 export default 或 export 一个数组。
// 入口文件
import Mock from 'mockjs';

Mock.setup({
  timeout: '500-800',
});

const context = require.context('./services', true, /\.mock.js$/);

context.keys().forEach((key) => {
  Object.keys(context(key)).forEach((paramKey) => {
    Mock.mock(...context(key)[paramKey]);
  });
});

// 示例模板
import Mock from 'mockjs';

const { Random } = Mock;

export default [
  RegExp('/example.*'),
  'get',
  {
    'range|50-100': 50,
    'data|10': [
      {
        // 唯一 ID
        id: '@guid()',
        // 生成一个中文名字
        cname: '@cname()',
        // 生成一个 url
        url: '@url()',
        // 生成一个地址
        county: Mock.mock('@county(true)'),
        // 从数组中随机选择一个值
        'array|1': ['A', 'B', 'C', 'D', 'E'],
        // 随机生成一个时间
        time: '@datetime()',
        // 生成一张图片
        image: Random.dataImage('200x100', 'Mock Image'),
      },
    ],
  },
];

// resKey
// condition, { resKey }
// path: '/temp/:id',
// const pageOpts = new createPage({
// searchGroup: [
// pageOpts.createTable({
//   primaryKey: 't_login_log_id',
//   getFn: getLoginLogs,
// format: formatEnum.tmpToDay
// type: inputEnum.select,
// FastGPT
// Nuxt

// [路由]
// 布局暂时分为三大类：
// frameIn：基于 BasicLayout，通常需要登录或权限认证的路由。
// frameOut：不需要动态判断权限的路由，如登录页或通用页面。
// errorPage：例如404。
```
