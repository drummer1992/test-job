'use strict';

const { server } = require('./app');
const isUUID = require('is-uuid');
const io = require('socket.io')(server, {
  path: '/chat'
});

io.on('connection', socket => {
  const [token, login] = socket
    .handshake
    .query
    .id.split('/');
  if (!isUUID.v4(token)) {
    socket.send('You must be authenticated (login)');
  }
  socket.join('users', () => {
    socket
      .to('users')
      .emit('message', `${login} has joined the room!`);
  });
  socket.on('logout', () => socket.leave('users', () => {
    socket
      .to('users')
      .emit('message', `${login} has left the room!`);
    socket.disconnect(true);
  }));

  socket.on('message', msg => {
    const str = `${msg.login}: ${msg.message}`;
    socket.to('users').send(str);
  });
});

module.exports = io;
