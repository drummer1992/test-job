'use strict';

const request = require('./request');

module.exports = function deleteTodoItem(rl) {
  return new Promise((resolve, reject) => {
    if (!rl.token) return reject({ error: 'Нужно быть залогиненым' });
    rl.question('Введите "id" заметки!\n\n',
      async answer => {
        const answers = answer.split(' ');
        const id = answers[answers.length - 1];
        const path = `/api/todoList${id ? '/' + id : '/validID'}`;
        const res = await request(path, 'DELETE', '', `Bearer ${rl.token || ''}`);
        if (res['error']) {
          reject(res);
        } else {
          resolve(res);
        }
      });
  });
};
