const logger = require('./logger');

module.exports = options => {
  const loggerMiddleware = logger(options);
  return (ctx, next) => {
    return loggerMiddleware(ctx, next)
      .catch(error => {
        if (ctx.status < 500)
          ctx.status = 500;
        ctx.log.error(error.stack);
        ctx.throw(error);
      })
  }
};
