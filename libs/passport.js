'use strict';

const { KoaPassport } = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/sequelize/User');
const UserLocal = require('../models/localModels/User');
const { db: { persistent } } = require('../config');
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
    return UserLocal.findByLogin(login);
  }
  return await User.findOne({ where: { login } });
}

