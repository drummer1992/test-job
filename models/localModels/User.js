'use strict';

const uuid = require('uuid/v4');
const crypto = require('crypto');
const { crypto: config } = require('../../config');

class UserLocal {

  static build({ login, isAdmin = false }) {
    return new UserLocal({ login, isAdmin });
  }

  static findById(id) {
    return UserLocal._storage[id] || null;
  }

  static findByToken(token) {
    for (const field in UserLocal._storage) {
      const user = UserLocal._storage[field];
      if (user.token === token) return user;
    }
    return null;
  }

  static findByLogin(login) {
    for (const id in UserLocal._storage) {
      const user = UserLocal._storage[id];
      if (user.login === login) return user;
    }
    return null;
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

  constructor({ login, isAdmin = false }) {
    if (!login)
      throw new Error('Login is required field!');
    this.id = uuid();
    this.login = login;
    this.hash = null;
    this.salt = null;
    this.isAdmin = isAdmin;
    this.token = null;
  }

  save() {
    UserLocal._storage[this.id] = this;
  }

  async setPassword(password) {
    this.salt = await UserLocal.generateSalt();
    this.hash = await UserLocal.generateHash(this.salt, password);
  }

  async checkPassword(password) {
    const hash = await UserLocal.generateHash(this.salt, password);
    return hash === this.hash;
  }
}

Object.defineProperty(UserLocal, '_storage', {
  value: {},
  writable: false,
  configurable: false,
  enumerable: false,
});


module.exports = UserLocal;
