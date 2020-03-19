'use strict';

const { DataTypes } = require('sequelize');
const TodoListItem = require('./TodoList_Item');

const crypto = require('crypto');
const { crypto: config } = require('../../config');

const { sequelize } = require('../../libs/connection');

const User = sequelize.define('TodoUser', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  login: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  hash: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  salt: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  token: {
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  timestamps: false,
});


function generateSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(config.length, (err, buffer) => {
      if (err) return reject(err);
      return resolve(buffer.toString('hex'));
    });
  });
}

function generateHash(salt, password) {
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

User.prototype.setPassword = async function setPassword(password) {
  this.salt = await generateSalt();
  this.hash = await generateHash(this.salt, password);
};

User.prototype.checkPassword = async function checkPassword(password) {
  const hash = await generateHash(this.salt, password);
  return hash === this.hash;
};

User.hasMany(TodoListItem);
TodoListItem.belongsTo(User);

module.exports = User;
