const Koa = require('koa');

const middleware = require('./middleware');
const router = require('./router');

const app = new Koa();


middleware(app);

router(app);

app.listen(9800, () => {
  console.log('server is running at http://127.0.0.1:9800');
});
