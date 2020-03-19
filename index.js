'use strict';


const app = require('./app');
const config = require('./config');
const { connection } = require('./libs/connection');

connection(config.db.persistent);
app.listen(config.port);
