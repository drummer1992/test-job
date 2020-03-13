'use strict';

const passport = require('../libs/passport');
const uuid = require('uuid/v4');
const tokensUsers = require('../db/tokensUsers');

module.exports = async (ctx, next) => {
  await passport.authenticate('local', (err, user, info) => {
    if (err) throw err;

    if (!user) {
      ctx.throw(400, info);
    }
    const token = uuid();
    tokensUsers[token] = user;
    ctx.body = { token };
  })(ctx, next);
};
