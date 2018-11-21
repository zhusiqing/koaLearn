const Koa = require('koa');
// require('koa-router')返回的是一个函数，需要调用下
const router = require('koa-router')();
const app = new Koa();
app.on('error', (err, ctx) => {
    console.log('server error >>> ', err, ctx);
})

// logger
app.silent = true
app.use(async (ctx, next) => {
    await next();
    const responseTime = ctx.response.get('X-Response-Time');
    console.log(`【${ctx.method}】 ${ctx.url} - ${responseTime}`);
});

// set x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
    console.log('before');
    await next();
    console.log('end');
})
router.get('/', async(ctx, next) => {
  ctx.body = '<h1>index page</h1>'
});

router.get('/home', async(ctx, next) => {
  ctx.body = '<h1>home page</h1>'
});

router.get('/404', async(ctx, next) => {
  ctx.body = '<h1>Not Found page</h1>'
});
app.use(router.routes());

const port = 9800;
app.listen(port);
console.log(`server is started in : \n http://127.0.0.1:${port}`);
