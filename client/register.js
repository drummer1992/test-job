'use strict';

const request = require('./request');

module.exports = function register(rl) {
  return new Promise(resolve => {
    rl.question('Please enter a login!\n\n', login => {
      rl.question('Please enter a password!\n\n', async password => {
        if (!login || !password) return resolve({ error: 'All fields are required!' });
        const body = JSON.stringify({ login, password });
        const response = await request('/api/register', 'POST', body);
        return resolve(response);
      });
    });
  });
};
