const Router = require('koa-router');
const HomeController = require('./controller/home');
const LoginController = require('./controller/login');

const router = new Router();

module.exports = app => {
  // home
  router.get('/', HomeController.index);
  router.get('/home', HomeController.home);
  router.get('/home/:id/:name', HomeController.homeParams);
  // login
  router.get('/login', LoginController.index);
  router.post('/login', LoginController.login);

  app.use(router.routes())
    .use(router.allowedMethods());
}
