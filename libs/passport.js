'use strict';

const { KoaPassport } = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/sequelize/User');
const { db: { persistent } } = require('../config');
const users = require('../db/users');
const passport = new KoaPassport();

passport.use(new LocalStrategy({ session: false, usernameField: 'login' }, async (login, password, done) => {
  try {

    const user = await isExistsUser(login);
    if (!user) return done(null, false, 'This user does not exist!');

    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) return done(null, false, 'Invalid password!');

    return done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
}));


module.exports = passport;



async function isExistsUser(login) {
  if (!persistent) {
    let user = null;
    for (const id in users) {
      if (users[id].login === login) {
        user = users[id];
      }
    }
    return user;
  }
  const user = await User.findOne({ where: { login } });
  return user;
}

