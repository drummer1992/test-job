'use strict';

module.exports = async (ctx, next) => {
  const { login, password } = ctx.request.body;
  if (!login || !password) {
    return ctx.throw(400, {
      message: 'Поля username и password должны быть заполнены!',
    });
  }
  await next();
};
