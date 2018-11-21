const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(9800);
console.log('server is started in :  \n http://127.0.0.1:9800');

