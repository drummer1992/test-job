'use strict';

const request = require('./request');

module.exports = function loginFunc(rl) {
  return new Promise(resolve => {
    rl.question('Введите логин!\n\n', login => {
      rl.question('Введите пароль!\n\n', async password => {
        if (!login || !password) return resolve({ error: 'Вы не заполнили все поля!' });
        const body = JSON.stringify({ login, password });
        const response = await request('/api/login', 'POST', body);
        return resolve(response);
      });
    });
  });
};
