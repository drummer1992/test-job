'use strict';

const request = require('./request');
const tokenStorage = require('./token');

module.exports = function updateTodoItem(rl) {
  return new Promise(resolve => {
    if (!tokenStorage.token) return resolve({ error: 'Нужно быть залогиненым' });
    rl.question('Введите тему заметки!\n\n', subject => {
      rl.question('Введите текст заметки\n\n', text => {
        rl.question('Введите id заметки\n\n', async id => {
          if (!subject || !text || !id) return resolve({ error: 'Вы не заполнили все поля!' });
          const path = `/api/todoList/${id}`;
          const body = JSON.stringify({ [subject]: text });
          const response = await request(path, 'PUT', body, `Bearer ${tokenStorage.token}`);
          return resolve(response);
        });
      });
    });
  });
};

