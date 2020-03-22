'use strict';

const register = require('./register');
const login = require('./login');
const stop = require('./stop');
const create = require('./create');
const read = require('./read');
const update = require('./update');
const remove = require('./delete');
const chat = require('./chat');

const message = `TodoListApp CLI:\n
register  ---  User registration
login     ---  User authentication
create    ---  To create a note
read      ---  View all notes
update    ---  Update the note
delete    ---  Delete the note
chat      ---  Chat
stop      ---  Exit
\n`;

module.exports = async function start(rl, queryMessage = message) {
  const queries = {
    register,
    login,
    create,
    read,
    update,
    delete: remove,
    stop,
    chat,
    help: start.bind(null, rl, message),
  };

  rl.question(`What do we do?\n\n${queryMessage}`, async answer => {

    if (!Object.keys(queries).includes(answer)) {
      return queries.help();
    }

    try {

      const res = await queries[answer](rl);
      res && console.log(res);
      start(rl, '');

    } catch (error) {

      if (!error.message) console.log(error);

    }
    return start(rl, '');
  });
};

