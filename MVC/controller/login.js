const LoginService = require('../service/login');

module.exports = {
  index: async(ctx) => {
    ctx.body = `
      <form action="/login" method="post">
        <input name="name" type="text" placeholder="请输入用户名：abc"/>
        <br/>
        <input name="password" type="text" placeholder="请输入密码：123"/>
        <br/>
        <button>GoGoGo</button>
      </form>
    `
  },
  login: async(ctx) => {
    const { name, password } = ctx.request.body;
    const success = await LoginService.login(name, password);
    if (success) {
      ctx.body = `Hello ${name}`;
    } else {
      ctx.send({
        status: 304,
        message: '账户或密码错误'
      })
    }
  }
}
