'use strict';

const request = require('./request');
const tokenStorage = require('./token');

module.exports = function createTodoItem(rl) {
  return new Promise(resolve => {
    if (!tokenStorage.token) return ({ error: 'Нужно быть залогиненым' });
    rl.question('Введите тему заметки\n\n', subject => {
      rl.question('Введите текст заметки\n\n', async text => {
        if (!subject || !text) return resolve({ error: 'Нужно все праильно заполнить!' });
        const body = JSON.stringify({ [subject]: text });
        const response = await request('/api/todoList', 'POST', body, `Bearer ${tokenStorage.token}`);
        return resolve(response);
      });
    });
  });
};


