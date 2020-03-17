'use strict';

const request = require('./request');
const tokenStorage = require('./token');

module.exports = function deleteTodoItem(rl) {
  return new Promise(resolve => {
    if (!tokenStorage.token) return resolve({ error: 'Нужно быть залогиненым' });
    rl.question('Введите "id" заметки!\n\n',
      async answer => {
        const answers = answer.split(' ');
        const id = answers[answers.length - 1];
        const path = `/api/todoList${id ? '/' + id : '/validID'}`;
        const response = await request(path, 'DELETE', '', `Bearer ${tokenStorage.token}`);
        return resolve(response);
      });
  });
};
