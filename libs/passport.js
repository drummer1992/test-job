'use strict';

const { KoaPassport } = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const passport = new KoaPassport();

const users = require('../db/users');

passport.use(new LocalStrategy({ session: false, usernameField: 'login' }, async (login, password, done) => {
  try {
    let user = null;
    for (const id in users) {
      if (users[id].login === login) {
        user = users[id];
      }
    }
    if (!user) return done(null, false, 'Такого пользователя не существует!');

    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) return done(null, false, 'Не верный пароль!');

    return done(null, user);
  } catch (error) {
    done(error);
  }
}));


module.exports = passport;
