'use strict';

const tokens = require('../db/tokens');
const dbUser = require('../db/users');
const map = require('../mappers/todo');

module.exports = ctx => {
  const token = ctx.request.get('Authorization').split(' ')[1];
  if (!token) {
    return ctx.throw(400, 'Что бы получить доступ к заметкам нужно иметь token');
  }
  const user = tokens[token];

  if (!user) {
    ctx.throw(400, 'Вы не имеете права просматривать заметки!');
  }

  if (user.isAdmin) {
    return ctx.body = map(dbUser);
  }
  ctx.body = {
    [user.username]: user.todoList
  };
};
