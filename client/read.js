'use strict';

const request = require('./request');
const tokenStorage = require('./token');

module.exports = function readTodoItems() {
  return new Promise((resolve, reject) => {
    if (!tokenStorage.token) return reject({ error: 'Нужно быть залогиненым' });
    request('/api/todoList', 'GET', '', `Bearer ${tokenStorage.token}`)
      .then(res => {
        if (res['error']) {
          reject(res);
        } else {
          resolve(res);
        }
      });
  });
};
