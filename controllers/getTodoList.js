'use strict';
const TodoListLocal = require('../models/localModels/TodoList_Item');
const TodoList = require('../models/sequelize/TodoList_Item');

const { db: { persistent } } = require('../config');

module.exports = async ctx => {
  const { user } = ctx;
  const convertUser = convertUserFunc(user);
  const convertTodoList = await convertTodoListFunc(convertUser);
  ctx.body = { [convertUser.login]: [...convertTodoList] };
};

function convertUserFunc(user) {
  if (!persistent) return user;
  return user.dataValues;
}

async function convertTodoListFunc({ isAdmin, id }) {
  if (!persistent) {
    return !isAdmin ?
      TodoListLocal.findById(id) :
      TodoListLocal.findAll();
  }
  return !isAdmin ?
    await TodoList.findAll({ where: { TodoUserId: id } }) :
    await TodoList.findAll();
}
