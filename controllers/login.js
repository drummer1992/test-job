'use strict';

const passport = require('../libs/passport');
const uuid = require('uuid/v4');
const users = require('../db/users');

module.exports = async (ctx, next) => {
  await passport.authenticate('local', (err, login, info) => {
    if (err) throw err;

    if (!login) {
      ctx.throw(401, info);
    }
    const token = uuid();
    users[login.id].token = token;
    ctx.body = { token };
  })(ctx, next);
};
