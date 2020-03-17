'use strict';

const todoList = require('../db/todoList');
const TodoList = require('../models/sequelize/TodoList_Item');

const { map, miniMap } = require('../mappers/todo');
const { db: { persistent } } = require('../config');

module.exports = async ctx => {
  const { user } = ctx;
  const convertUser = await convertUserFunc(user);
  const convertTodoList = await convertTodoListFunc(convertUser);
  ctx.body = { [convertUser.login]: convertTodoList };
};

async function convertUserFunc(user) {
  if (!persistent) return user;
  return user.dataValues;
}

async function convertTodoListFunc({ isAdmin, id }) {
  if (!persistent) {
    return isAdmin ? map(todoList) : miniMap(todoList[id], id);
  }
  return !isAdmin ?
    await TodoList.findAll({ where: { TodoUserId: id } }) :
    await TodoList.findAll();
}
