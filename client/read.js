'use strict';

const request = require('./request');
const tokenStorage = require('./token');

module.exports = async function readTodoItems() {
  if (!tokenStorage.token) return ({ error: 'Нужно быть залогиненым' });
  return await request('/api/todoList', 'GET', '', `Bearer ${tokenStorage.token}`);
};
