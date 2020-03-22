'use strict';

const io = require('socket.io-client');

const storage = require('./token');

const { port } = require('../config');

const queryMessage = 'Welcome to chat!\np/s: if you want to return to the previous page, print "/back"\n';

module.exports =  async function chat(rl, question = queryMessage) {
  if (!storage.token) return { error: 'Must be authenticated!' };
  const socket = io(`http://localhost:${port}`, {
    path: `/chat/?id=${storage.token}/${storage.login}`
  });

  socket.on('message', console.log);

  await conversation(rl, question, socket);
};

async function conversation(rl, question, socket) {
  return new Promise(resolve => {

    rl.question(question, msg => {
      if (msg === '/back') {
        socket.emit('exit');
        return resolve();
      }

      socket.emit('message', { message: msg, login: storage.login });

      return resolve(conversation(rl, '', socket));
    });
  });
}
