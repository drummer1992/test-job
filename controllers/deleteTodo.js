'use strict';

const todoList = require('../db/todoList');

module.exports = async ctx => {
  const { id } = ctx.params;

  if (!id) {
    return ctx.throw(400, 'Вы не указали свойтво id в параметрах запроса');
  }

  const { user } = ctx;
  const userTodo = todoList[user.id];
  let deleted = false;

  userTodo.forEach((item, i) => {
    if (item.id === id) {
      userTodo.splice(i, 1);
      deleted = true;
    }
  });
  if (deleted) {
    return ctx.body = {
      message: 'Заметка удалена!'
    };
  }
  return ctx.throw(404, 'Такой заметки не существует');
};
