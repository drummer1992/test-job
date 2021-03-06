'use strict';
const request = require('./request');
const storage = require('./token');

module.exports = function loginFunc(rl) {

  return new Promise(resolve => {
    rl.question('Please enter a login!\n\n', login => {
      rl.stdoutMuted = true;
      console.log('Please enter a password!');
      rl.question('', async password => {
        rl.stdoutMuted = false;
        if (!login || !password) return resolve({ error: 'All fields are required!' });

        storage.login = login;
        const body = JSON.stringify({ login, password });
        const response = await request('/api/login', 'POST', body);

        return resolve(response);

      });

    });
  });
};
