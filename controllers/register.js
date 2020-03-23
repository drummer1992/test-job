'use strict';

const { db: { persistent } } = require('../config');

const User = require('../models/sequelize/User');
const UserLocal = require('../models/localModels/User');


module.exports = async ctx => {
  const { login, password } = ctx.request.body;

  if (!login || !password) {
    return ctx.throw(400, 'The login and password fields must be filled in!');
  }

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
    const newUser = UserLocal.build(user);
    await newUser.setPassword(password);
    return newUser.save();
  }

  const newUser = await User.build(user);
  await newUser.setPassword(password);
  await newUser.save();
}

async function isUniqueUser(login) {
  if (!persistent) {
    const user = UserLocal.findByLogin(login);
    return !user;
  }
  const user = await User.findOne({
    where: { login }
  });

  return !user;
}
