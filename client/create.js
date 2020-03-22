'use strict';

const request = require('./request');
const storage = require('./token');

module.exports = function createTodoItem(rl) {
  return new Promise(resolve => {
    if (!storage.token) return ({ error: 'Must be authenticated!' });
    rl.question('Enter the subject of the note\n\n', subject => {
      rl.question('Enter the note text\n\n', async text => {
        if (!subject || !text) return resolve({ error: 'All fields are required!' });

        const body = JSON.stringify({ [subject]: text });
        const response = await request('/api/todoList', 'POST', body, `Bearer ${storage.token}`);

        return resolve(response);
      });
    });
  });
};


