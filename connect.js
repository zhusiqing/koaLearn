const Koa = require('koa');
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
app.use(async ctx => {
    ctx.body = 'connect execution order';
})

const port = 9800;
app.listen(port);
console.log(`server is started in : \n http://127.0.0.1:${port}`);
