'use strict';

const todoList = require('../db/todoList');
const map = require('../mappers/todo');

module.exports = ctx => {
  const { user } = ctx;
  if (user.isAdmin) {
    return ctx.body = map(todoList);
  }
  ctx.body = {
    [user.login]: todoList[user.id]
  };
};
