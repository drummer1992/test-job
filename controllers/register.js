'use strict';

const users = require('../db/users');
const User = require('../models/User');
const todoList = require('../db/todoList');

module.exports = async ctx => {
  const { login, password } = ctx.request.body;

  for (const id in users) {
    if (users[id].login === login) {
      return ctx.throw(400, 'Пользователь с таким логином уже существует!');
    }
  }

  const user = {
    login,
    isAdmin: login === 'admin',
  };
  const newUser = new User(user);
  const { id } = newUser;
  users[id] = newUser;
  todoList[id] = [];
  ctx.body = { message: 'Регистрацыя прошла успешно!' };
  await newUser.setPassword(password);
};
