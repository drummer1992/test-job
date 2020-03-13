'use strict';
/* eslint-disable require-atomic-updates */
const dbUser = require('../db/users');
const User = require('../models/User');

module.exports = async ctx => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    return ctx.throw(400, 'Должны быть заполнены все поля!');
  }
  if (dbUser['Andrey'] && username === 'Andrey') {
    return ctx.throw(400, 'Админ может быть только ОДИН!');
  }
  const user = {
    username,
    isAdmin: username === 'Andrey',
  };
  const newUser = new User(user);
  await newUser.setPassword(password);
  dbUser[username] = newUser;
  ctx.body = { message: 'Регистрацыя прошла успешно!' };
};
