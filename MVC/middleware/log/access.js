module.exports = (ctx, message, commonInfo = {}) => {
  const {
    method, // 请求方式
    url, // 请求地址
    host, // 请求host
    headers // 请求headers
  } = ctx.request;
  const client = {
    method,
    url,
    host,
    message,
    referer: headers['referer'], // 请求源地址
    userAgent: headers['user-agent']
  }
  return JSON.stringify(Object.assign(commonInfo, client));
}
