/* eslint-disable require-atomic-updates */
'use strict';

const todoList = require('../db/todoList');
const TodoListItem = require('../models/localModels/TodoList_Item');
const TodoList_Item = require('../models/sequelize/TodoList_Item');
const maper = require('../mappers/createOrUpdateTodo');

const { db: { persistent } } = require('../config');

module.exports = async ctx => {
  const note = ctx.request.body;
  if (Object.keys(note).includes('')) {
    return ctx.throw(400, 'Тело запроса пустое или некорректно заполнено, заметка не добавлена!');
  }
  const { id } = ctx.user;
  await createItem(note, id);
  ctx.body = { message: 'Заметка успешно добавлена!' };
};

async function createItem(note, id) {
  if (!persistent) {
    const todoListItem = new TodoListItem(note);
    return todoList[id].push(todoListItem);
  }
  await TodoList_Item.create(maper(note, id));
}

