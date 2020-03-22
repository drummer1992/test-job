'use strict';

const { server } = require('./app');

const io = require('socket.io')(server, {
  path: '/chat'
});

io.on('connection', socket => {
  socket.on('login', () => socket.join('users', () => {
    socket
      .broadcast
      .to('users')
      .emit('message', 'A new user has joined the room!');
  }));
  socket.on('logout', () => socket.leave('users', () => {
    socket
      .broadcast
      .to('users')
      .emit('message', 'A user has left the room!');
  }));

  socket.on('message', msg => {
    socket.to('users').send(msg);
  });
});

module.exports = io;
