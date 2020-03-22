'use strict';

const request = require('./request');
const storage = require('./token');

module.exports = async function readTodoItems() {
  if (!storage.token) return ({ error: 'Must be authenticated!' });
  return await request('/api/todoList', 'GET', '', `Bearer ${storage.token}`);
};
