'use strict';

const request = require('./request');

module.exports = function readTodoItems(rl) {
  return new Promise((resolve, reject) => {
    if (!rl.token) return reject({ error: 'Нужно быть залогиненым' });
    request('/api/todoList', 'GET', '', `Bearer ${rl.token || ''}`)
      .then(res => {
        if (res['error']) {
          reject(res);
        } else {
          const response = {};
          for (const user in res) {
            if (!response[user]) response[user] = [];
            const todoList = res[user];
            for (const note of todoList) {
              response[user].push({
                id: note.id,
                ...note.note
              });
            }
          }
          resolve(response);
        }
      });
  });
};
