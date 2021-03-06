'use strict';
const { server: app } = require('./app');
require('./socket');
const config = require('./config');
const { connection } = require('./libs/connection');
const { rl, start } = require('./client/main');

connection(config.db.persistent);

const onlyServer = process.argv[2] === '-s';

app.listen(config.port, !onlyServer && start.bind(null, rl));

