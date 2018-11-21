module.exports = (ctx, message, commonInfo = {}) => {
  const {
    method, // 请求方式
    url, // 请求地址
    host, // 请求host
    headers // 请求headers
  } = ctx.request;
  let params = {};
  const req = ctx.request;
  console.log(req.query);
  if (req.body && Object.keys(req.body).length) {
    params = req.body;
  } else if (req.query && Object.keys(req.query).length) {
    params = req.query;
  }
  const client = {
    method,
    url,
    host,
    message,
    params,
    referer: headers['referer'], // 请求源地址
    userAgent: headers['user-agent']
  }
  return JSON.stringify(Object.assign(commonInfo, client));
}
