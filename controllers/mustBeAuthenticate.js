'use strict';

const tokens = require('../db/tokens');

module.exports = async function mustBeAuthenticate(ctx, next) {
  const token = ctx.request.get('Authorization').split(' ')[1];
  if (!token) {
    return ctx.throw(400, 'Что бы получить доступ к заметкам нужно иметь token');
  }
  const user = tokens[token];
  if (!user) {
    ctx.throw(400, 'Пользователя с таким токеном не существует!');
  }
  ctx.user = user;
  next();
};
