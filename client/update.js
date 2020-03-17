'use strict';

const request = require('./request');
const tokenStorage = require('./token');

module.exports = function updateTodoItem(rl) {
  return new Promise(resolve => {
    if (!tokenStorage.token) return resolve({ error: 'Must be authenticated' });
    rl.question('Enter the subject of the note!\n\n', subject => {
      rl.question('Enter the note text\n\n', text => {
        rl.question('Enter the note id\n\n', async id => {
          if (!subject || !text || !id) return resolve({ error: 'All fields are required!!' });
          const path = `/api/todoList/${id}`;
          const body = JSON.stringify({ [subject]: text });
          const response = await request(path, 'PUT', body, `Bearer ${tokenStorage.token}`);
          return resolve(response);
        });
      });
    });
  });
};

