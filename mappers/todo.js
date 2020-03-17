'use strict';


const miniMap = (arr, userId) => arr.map(item => {
  const obj = { ...item.note, id: item.id };

  for (const subject of Object.keys(obj)) {
    if (subject !== 'id') {
      return {
        subject,
        note: obj[subject],
        id: item.id,
        TodoUserId: userId
      };
    }
  }

});

function map(todoList) {
  const response = [];
  for (const userId in todoList) {
    response.push(...miniMap(todoList[userId], userId));
  }
  return response;
}


module.exports = { map, miniMap };
