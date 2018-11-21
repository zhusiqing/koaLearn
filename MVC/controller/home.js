const HomeService = require('../service/home');

module.exports = {
  index: async(ctx, next) => {
    ctx.body = '<h1>index page</h1>';
  },
  home: async(ctx, next) => {
    console.log(ctx.request.query);
    console.log(ctx.request.querystring);
    ctx.body = '<h1>home page</h1>'
  },
  homeParams: async(ctx) => {
    const { id, name } = ctx.params;
    // ctx.body = `<h1>home page /${id}/${name}</h1>`;
    ctx.send({
      status: 200,
      data: {
        id,
        name
      }
    });
    ctx.log.info(`send data: ${JSON.stringify(ctx.params)}`);
  },
  login: async(ctx) => {
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
  loginPost: async(ctx) => {
    const { name, password } = ctx.request.body;
    const data = await HomeService.loginPost(name, password);
    ctx.body = data;
  }
}
