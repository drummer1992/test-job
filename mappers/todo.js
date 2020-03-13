'use strict';

module.exports = function(users) {
  const response = {};
  for (const user in users) {
    response[user] = users[user].todoList;
  }
  return response;
};
