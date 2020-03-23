'use strict';

const { db: { persistent } } = require('../config');
const User = require('../models/sequelize/User');
const UserLocal = require('../models/localModels/User');
const isUUID = require('is-uuid');

async function isExistsToken(token) {
  if (!persistent) {
    return UserLocal.findByToken(token);
  }
  return await User.findOne({ where: { token } });

}


module.exports.mustBeAuthenticate = async (ctx, next) => {
  const token =  ctx.request.get('Authorization').split(' ')[1];

  const { id } = ctx.params;

  if (id && !isUUID.v4(id)) {
    return ctx.throw(400, 'Invalid id!');
  }

  if (!isUUID.v4(token)) {
    return ctx.throw(401, 'Invalid token!');
  }

  const loginUser = await isExistsToken(token);

  if (!loginUser) {
    return ctx.throw(401, 'Must be authenticated!');
  }
  ctx.user = loginUser;
  await next();
};

