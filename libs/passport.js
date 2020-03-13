'use strict';

const { KoaPassport } = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const passport = new KoaPassport();

const dbUser = require('../db/users');

passport.use(new LocalStrategy({ session: false }, async (username, password, done) => {
  try {
    const user = dbUser[username];
    if (!user) return done(null, false, 'Такого пользователя не существует!');

    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) return done(null, false, 'Не верный пароль!');

    return done(null, user);
  } catch (error) {
    done(error);
  }
}));


module.exports = passport;
