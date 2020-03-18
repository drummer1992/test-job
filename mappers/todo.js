'use strict';


function map(todoList) {
  const response = [];
  for (const userId in todoList) {
    response.push(...todoList[userId]);
  }
  return response;
}


module.exports.map = map;
