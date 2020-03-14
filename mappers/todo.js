'use strict';

const users = require('../db/users');

module.exports = function(todoList) {
  const response = {};
  for (const id in todoList) {
    const login = users[id].login;
    response[login] = todoList[id];
  }
  return response;
};
