'use strict';
const TodoList = require('../models/sequelize/TodoList_Item');
const TodoListLocal = require('../models/localModels/TodoList_Item');
const { db: { persistent } } = require('../config');

module.exports = async ctx => {
  const { id } = ctx.params;

  const note = ctx.request.body;

  if (!Object.keys(note).length) {
    return ctx.throw(400, 'Subject and notes are required fields for the request!');
  }

  const user = ctx.user;

  const updated = await isUpdate(id, note, user.id);

  if (!updated) {
    return ctx.throw(404, 'This note does not exist!');
  }

  return ctx.body = {
    message: 'Note updated!',
    note,
  };
};


async function isUpdate(id, note, userId) {
  if (!persistent) {
    return TodoListLocal.findAndUpdate(id, note, userId);
  }
  const prepareNote = TodoList._map(id, note, userId);
  return await TodoList.update(prepareNote, { where: { id } });
}
