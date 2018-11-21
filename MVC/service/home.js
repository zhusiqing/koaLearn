module.exports = {
  loginPost: async(name, password) => {
    if (name === 'abc' && password === '123')
      return `Hello ${name}`;
    return '账号信息错误'
  }
}
