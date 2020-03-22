'use strict';

const storage = require('./token');

const { port } = require('../config');

const socket = require('socket.io-client')(`http://localhost:${port}`, {
  path: '/chat'
});

socket.on('message', console.log);

const MESSAGE = 'Welcome to chat!\np/s: if you want to return to the previous page, print "/back"\n';

module.exports = async function chat(rl, question = MESSAGE) {
  return new Promise(resolve => {

    if (!storage.token) return resolve({ error: 'Must be authenticated!' });

    socket.emit('login');

    rl.question(question, async answer => {
      if (answer === '/back') {
        socket.emit('logout');
        return resolve();
      }

      socket.emit('message', `${[storage.login]}: ${answer}`);

      return resolve(await chat(rl, ''));
    });
  });
};



