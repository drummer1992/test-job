'use strict';

const request = require('./request');

module.exports = function createTodoItem(rl) {
  return new Promise((resolve, reject) => {
    if (!rl.token) return reject({ error: 'Нужно быть залогиненым' });
    rl.question('Введите тему заметки\n\n', subject => {
      rl.question('Введите текст заметки\n\n', async text => {
        if (!subject || !text) return reject({ error: 'Нужно все праильно заполнить!' });
        const body = JSON.stringify({ [subject]: text });
        const res = await request('/api/todoList', 'POST', body, `Bearer ${rl.token || ''}`);
        if (res['error']) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    }
    );
  });
};


