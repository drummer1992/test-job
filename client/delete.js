'use strict';

const request = require('./request');
const storage = require('./token');

module.exports = function deleteTodoItem(rl) {
  return new Promise(resolve => {
    if (!storage.token) return resolve({ error: 'Must be authenticated!' });
    rl.question('Enter the note id!\n\n',
      async answer => {
        const answers = answer.split(' ');
        const id = answers[answers.length - 1];

        const path = `/api/todoList${id ? '/' + id : '/validID'}`;
        const response = await request(path, 'DELETE', '', `Bearer ${storage.token}`);

        return resolve(response);
      });
  });
};
