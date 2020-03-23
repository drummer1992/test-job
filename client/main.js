'use strict';

const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

const readline = require('readline');
const start = require('./start');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl._writeToOutput = function _writeToOutput(stringToWrite) {
  if (rl.stdoutMuted)
    rl.output.write('*');
  else
    rl.output.write(stringToWrite);
};



module.exports = { start, rl };

// if you add client like "node main.js -c"
if (process.argv[2] === '-c') start(rl);
