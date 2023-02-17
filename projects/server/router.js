import Router from '@koa/router';

const router = new Router();

router
  .get('/', (ctx, next) => {
    ctx.body = 'Home page';
  })
  .get('/users', (ctx) => {
    debugger;
    ctx.body = 'Users page';
  })
  .get('/users/:user', (ctx) => {
    debugger;
    ctx.body = ctx.user;
  });

export { router };
