'use strict';

const users = require('../db/users');
const User = require('../models/User');

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
  await newUser.setPassword(password);
  const { id } = newUser;
  users[id] = newUser;
  ctx.body = { message: 'Регистрацыя прошла успешно!' };
};
