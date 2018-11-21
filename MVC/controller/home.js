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
  }
}
