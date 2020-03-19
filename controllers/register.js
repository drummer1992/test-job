'use strict';

const { db: { persistent } } = require('../config');

const User = persistent ?
  require('../models/sequelize/User') :
  require('../models/localModels/User');

const users = require('../db/users');

const todoList = require('../db/todoList');


module.exports = async ctx => {
  const { login, password } = ctx.request.body;
  try {
    const isUnique = await isUniqueUser(login, password);

    if (!isUnique) {
      return ctx.throw(400, 'This login already exists!');
    }

    const user = {
      login,
      isAdmin: login === 'admin',
    };
    await createUser(user, password);
    ctx.status = 201;
    ctx.body = { message: 'Registration was successful!' };
  } catch (error) {
    return ctx.throw(500, error);
  }
};



async function createUser(user, password) {
  if (!persistent) {
    const newUser = new User(user);
    const { id } = newUser;
    users[id] = newUser;
    todoList[id] = [];
    return await newUser.setPassword(password);
  }

  const newUser = await User.build(user);
  await newUser.setPassword(password);
  await newUser.save();
}

async function isUniqueUser(login) {
  if (!persistent) {
    for (const id in users) {
      if (users[id].login === login) {
        return false;
      }
    }
    return true;
  }
  const user = await User.findOne({
    where: { login }
  });

  return !user;
}
