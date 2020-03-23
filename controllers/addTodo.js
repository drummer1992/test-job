'use strict';
const TodoListLocal = require('../models/localModels/TodoList_Item');
const TodoList = require('../models/sequelize/TodoList_Item');
const uuid = require('uuid/v4');

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

async function createItem(note, userId) {
  const id = uuid();
  if (!persistent) {
    const prepareData = TodoListLocal._map(id, note, userId);
    return TodoListLocal.create(prepareData);
  }
  const prepareData = TodoList._map(id, note, userId);
  return await TodoList.create(prepareData);
}

