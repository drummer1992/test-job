'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  host: 'localhost',
  crypto: {
    length: 128,
    iterations: 1,
    digest: 'sha512'
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'todolist_app',
    username: process.env.DB_USER_NAME || 'username_for_database',
    persistent: true,
    logging: false,
  }
};
