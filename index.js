'use strict';


const app = require('./app');
const config = require('./config');
const { connection } = require('./libs/connection');
const { rl, start } = require('./client/main');

connection(config.db.persistent);


app.listen(config.port, start.bind(null, rl));
