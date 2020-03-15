'use strict';

const request = require('./request');

module.exports = function register(rl) {
  return new Promise((resolve, reject) => {
    rl.question('Введите логин!\n\n', login => {
      rl.question('Введите пароль!\n\n', async password => {
        const body = JSON.stringify({ login, password });
        const res = await request('/api/register', 'POST', body);
        if (res['error']) {
          console.log(res, '\n');
          reject(res);
        } else {
          resolve(res);
        }
      });
    });
  });
};
