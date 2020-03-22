'use strict';

const { server: app } = require('./app');
require('./socket');
const config = require('./config');
const { connection } = require('./libs/connection');
const { rl, start } = require('./client/main');

connection(config.db.persistent);

app.listen(config.port, start.bind(null, rl));

