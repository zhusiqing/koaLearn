const path = require('path');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const ip = require('ip');
const log = require('./log')
const send = require('./send')

module.exports = app => {
  app.use(log({
    env: app.env,
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }));
  app.use(koaStatic(path.resolve(__dirname, './public')));
  app.use(bodyParser());
  app.use(send())
}
