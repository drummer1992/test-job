'use strict';

const TodoList = require('../models/sequelize/TodoList_Item');
const TodoListLocal = require('../models/localModels/TodoList_Item');
const { db: { persistent } } = require('../config');

module.exports = async ctx => {
  const { id } = ctx.params;

  const { user } = ctx;

  const deleted = await isDelete(id, user.id);
  if (!deleted) {
    return ctx.throw(404, 'This note does not exist!');
  }
  return ctx.body = {
    message: 'The note has been deleted!'
  };
};

async function isDelete(id, userId) {
  if (!persistent) {
    return TodoListLocal.findAndDelete(id, userId);
  }
  return await TodoList.destroy({ where: { id } });
}
