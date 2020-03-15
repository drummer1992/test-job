'use strict';

const todoList = require('../db/todoList');
const TodoListItem = require('../models/TodoList_Item');

module.exports = async ctx => {
  const note = ctx.request.body;
  if (Object.keys(note).includes('')) {
    return ctx.throw(400, 'Тело запроса пустое или некорректно заполнено, заметка не добавлена!');
  }

  const todoListItem = new TodoListItem(note);
  const { id } = ctx.user;

  todoList[id].push(todoListItem);

  ctx.body = { message: 'Заметка успешно добавлена!' };
};
