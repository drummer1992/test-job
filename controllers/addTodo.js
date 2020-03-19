'use strict';

const todoList = require('../db/todoList');
const TodoListItem = require('../models/localModels/TodoList_Item');
const TodoList_Item = require('../models/sequelize/TodoList_Item');
const maper = require('../mappers/createOrUpdateTodo');

const { db: { persistent } } = require('../config');

module.exports = async ctx => {
  const note = ctx.request.body;
  if (Object.keys(note).includes('')) {
    return ctx.throw(400, 'Subject and notes are required fields for the request!');
  }
  const { id } = ctx.user;
  await createItem(note, id);
  ctx.status = 201;
  ctx.body = { message: 'Note added successfully!' };
};

async function createItem(note, id) {
  if (!persistent) {
    const todoListItem = new TodoListItem(maper(note, id));
    return todoList[id].push(todoListItem);
  }
  await TodoList_Item.create(maper(note, id));
}

