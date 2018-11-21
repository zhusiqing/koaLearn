module.exports = {
  login: async(ctx, name, password) => {
    if (name === 'abc' && password === '123')
      return true;
    return false
  }
}
