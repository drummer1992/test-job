'use strict';

const { db: {
  host,
  password,
  username,
  database,
  dialect,
  logging,
}, port } = require('../config');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host,
  password,
  username,
  database,
  dialect,
  logging,
});

async function connection(persistent) {
  if (persistent) {
    console.log(`Server start on port ${port} with persistent storage!`);
    await sequelize.sync();
    await sequelize.authenticate();

  } else {
    console.log(`Server start on port ${port} with inMemory storage!`);
  }
}


module.exports = { sequelize, connection };
