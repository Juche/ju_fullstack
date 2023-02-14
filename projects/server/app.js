import Koa from 'koa';
import { router } from './router.js';
import { getLocalIP } from './utils.js';

const ip = getLocalIP();
const port = '8888';

const app = new Koa();

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use((ctx) => {
    ctx.body = 'Hello Koa';
  });

app.listen(8888, () => {
  console.log(`Server running at http://${ip}:${port}/`);
});
