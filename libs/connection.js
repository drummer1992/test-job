'use strict';

const { db: {
  host,
  password,
  username,
  database,
  dialect,
  persistent,
} } = require('../config');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host,
  password,
  username,
  database,
  dialect,
});

async function connection(persistent) {
  if (persistent) {
    await sequelize.sync();
    await sequelize.authenticate();
  }
}

connection(persistent);

module.exports = sequelize;
