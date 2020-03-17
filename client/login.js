'use strict';

const request = require('./request');

module.exports = function loginFunc(rl) {
  return new Promise(resolve => {
    rl.question('Введите логин!\n\n', login => {
      rl.question('Введите пароль!\n\n', async password => {
        const body = JSON.stringify({ login, password });
        const res = await request('/api/login', 'POST', body);
        resolve(res);
      });
    });
  });
};
