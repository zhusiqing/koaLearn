const Router = require('koa-router');
const HomeController = require('./controller/home');

const router = new Router();

module.exports = app => {
  router.get('/', HomeController.index);
  router.get('/home', HomeController.home);
  router.get('/home/:id/:name', HomeController.homeParams);
  router.get('/login', HomeController.login);
  router.post('/login', HomeController.loginPost);

  app.use(router.routes())
    .use(router.allowedMethods());
}
