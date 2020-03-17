'use strict';

module.exports = async (ctx, next) => {
  const { login, password } = ctx.request.body;
  if (!login || !password) {
    return ctx.throw(400, {
      message: 'The username and password fields must be filled in!',
    });
  }
  await next();
};
