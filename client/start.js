'use strict';

const register = require('./register');
const login = require('./login');
const stop = require('./stop');
const create = require('./create');
const read = require('./read');
const update = require('./update');
const remove = require('./delete');

module.exports = async function start(rl) {
  const queries = {
    register,
    login,
    create,
    read,
    update,
    delete: remove,
    stop,
  };
  const message = `todoListApp_API:\n
    register === регистрацыя пользователя
    login  === аутентификация пользователя
    create === создания заметки
    read === чтения заметок
    update === обновление заметки
    delete === удаление заметки
    stop === выход зи процесса
  \n`;
  rl.question(`Что будем делать?\n\n${message}`, async answer => {

    if (!Object.keys(queries).includes(answer)) {
      console.log({ error: 'Не корректный запрос' }, '\n');
    }
    try {
      const res = await queries[answer](rl);
      res && console.log(res);
      start(rl);
    } catch (error) {
      if (!error.message)
        console.log(error);
    }
    return start(rl);
  });
};

