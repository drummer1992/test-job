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
  const message = `TodoListApp CLI:\n
    register  ---  User registration
    login     ---  User authentication
    create    ---  To create a note
    read      ---  View all notes
    update    ---  Update the note
    delete    ---  Delete the note
    stop      ---  Exit
  \n`;
  rl.question(`What do we do?\n\n${message}`, async answer => {

    if (!Object.keys(queries).includes(answer)) {
      console.log({ error: 'Bad request!' }, '\n');
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

