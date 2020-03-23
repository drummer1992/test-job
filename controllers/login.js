'use strict';
const passport = require('../libs/passport');
const uuid = require('uuid/v4');

const { db: { persistent } } = require('../config');

module.exports = async (ctx, next) => {
  const { login, password  } = ctx.request.body;
  if (!login || !password) {
    return ctx.throw(400, 'The login and password fields must be filled in!');
  }
  await passport.authenticate('local', async (err, user, info) => {
    if (err) throw err;

    if (!user) {
      return ctx.throw(401, info);
    }
    const token = await loginUser(user);
    ctx.body = { token };
  })(ctx, next);
};

async function loginUser(user) {
  const token = uuid();
  if (!persistent) {
    user.token = token;
  } else {
    user.token = token;
    await user.save();
  }
  return token;
}
