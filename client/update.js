'use strict';

const request = require('./request');

module.exports = function updateTodoItem(rl) {
  return new Promise((resolve, reject) => {
    rl.question('Введите тему заметки!\n\n', subject => {
      rl.question('Введите текст заметки\n\n', text => {
        rl.question('Введите id заметки\n\n', async id => {
          if (!subject || !text) return reject({ error: 'Нужно все праильно заполнить!' });
          const path = `/api/todoList/${id}`;
          const body = JSON.stringify({ [subject]: text });
          const res = await request(path, 'PUT', body, `Bearer ${rl.token || ''}`);
          if (res['error']) {
            reject(res);
          } else {
            resolve(res);
          }
        });
      });
    });
  });
};

