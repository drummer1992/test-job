'use strict';

const users = require('../db/users');

module.exports = async (ctx, next) => {
  const token =  ctx.request.get('Authorization').split(' ')[1];
  if (!token) {
    return ctx.throw(401, 'Что бы добавить заметку нужно залогинится и передать токен');
  }
  let loginUser = null;
  for (const id in users) {
    const user = users[id];
    if (user.token === token) {
      loginUser = user;
    }
  }

  if (!loginUser) {
    return ctx.throw(401, 'Пользователя с таким токеном не существует!');
  }
  ctx.user = loginUser;
  await next();
};
