'use strict';

const { server } = require('./app');

const io = require('socket.io')(server, {
  path: '/chat'
});

io.on('connection', socket => {
  socket.on('login', () => socket.join('users'));
  socket.on('logout', () => socket.leave('users'));

  socket.on('message', msg => {
    socket.to('users').send(msg);
  });
});

module.exports = io;
