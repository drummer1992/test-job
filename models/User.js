'use strict';

const crypto = require('crypto');
const { crypto: config } = require('../config');
const uuid = require('uuid/v4');

class User {

  constructor({ login, isAdmin }) {
    this.id = uuid();
    this.login = login;
    this.hash = null;
    this.salt = null;
    this.isAdmin = isAdmin;
    this.token = null;
  }

  static generateSalt() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(config.length, (err, buffer) => {
        if (err) return reject(err);
        return resolve(buffer.toString('hex'));
      });
    });
  }

  static generateHash(salt, password) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password, salt,
        config.iterations,
        config.length,
        config.digest,
        (err, buffer) => {
          if (err) return reject(err);
          resolve(buffer.toString('hex'));
        }
      );
    });
  }

  async setPassword(password) {
    this.salt = await User.generateSalt();
    this.hash = await User.generateHash(this.salt, password);
  }

  async checkPassword(password) {
    const hash = await User.generateHash(this.salt, password);
    return hash === this.hash;
  }
}

module.exports = User;
