'use strict';

const readline = require('readline');
const start = require('./start');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


module.exports = { start, rl };
