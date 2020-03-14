'use strict';

const todoList = require('../db/todoList');
const TodoItem = require('../models/TodoList_Item');

module.exports = async ctx => {
  const { id } = ctx.params;

  if (!id) {
    return ctx.throw(400, 'Вы не указали свойтво id в параметрах запроса');
  }
  const { user } = ctx;

  const userTodo = todoList[user.id];
  const note = ctx.request.body;

  if (Object.keys(note).length === 0) {
    return ctx.throw(400, 'Тело запроса пустое, заметка не добавлена!');
  }

  let updated = false;

  userTodo.forEach((item, i) => {
    if (item.id === id) {
      const updateTodoItem = new TodoItem(note);
      userTodo.splice(i, 1, updateTodoItem);
      updated = true;
    }
  });
  if (updated) {
    return ctx.body = {
      message: 'Заметка обновлена!',
      note,
    };
  }
  return ctx.throw(404, 'Такой заметки не существует');
};
