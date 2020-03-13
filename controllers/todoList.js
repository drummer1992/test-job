'use strict';

const tokens = require('../db/tokens');
const dbUser = require('../db/users');

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
    return ctx.body = dbUser;
  }
  ctx.body = {
    name: user.username,
    todoList: user.todoList
  };
};
