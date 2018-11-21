const log4js = require('log4js');
// 输出
const access = require('./access');

const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark'];
// 默认配置
const defaultConfig = {
  appLogLevel: 'debug', // 日志级别
  dir: 'logs', // 指定日志存放目录名
  env: 'dev', // 指定当前环境，当开发时控制台也输出
  serverIp: '0.0.0.0'
}


module. exports = (options = {}) => {
  const contextLogger = {};
  const opt = Object.assign({}, defaultConfig, options);
  const { env, appLogLevel, dir, serverIp } = opt;
  // 记录日志的方式
  const appenders = {
    log: {
      type: 'dateFile',
      filename: `${dir}/z`,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      serverIp,
      // 设置输出格式
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c %m%n'
      }
    }
  };
  if (env === 'dev' || env === 'local' || env === 'development') {
    appenders.out = {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c%] %m%n'
      }
    }
  }
  log4js.configure({
    /**
    * 指定要记录的日志分类 cheese
    * 展示方式为文件类型 file
    * 日志输出的文件名 cheese.log
    */
    // appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    appenders,
    /**
    * 指定日志的默认配置项
    * 如果 log4js.getLogger 中没有指定，默认为 cheese 日志的配置项, 数组
    * 指定 cheese 日志的记录内容为 error 及 error 以上级别的信息
    */
    categories: {
      default: {
        appenders: Object.keys(appenders),
        level: appLogLevel
      }
    }
  });

  const logger = log4js.getLogger('log');

  return async (ctx, next) => {
    const startTime = Date.now();
    methods.map(el => {
      contextLogger[el] = (message) => {
        logger[el](access(ctx, message, { serverIp }));
      }
    })
    ctx.log = contextLogger;
    await next();
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    logger.info(access(ctx, `响应时间：${responseTime}ms`, { serverIp }));
  }
}

