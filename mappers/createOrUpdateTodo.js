'use strict';

module.exports =  function updateOrCreateTodo(note, userId) {
  for (const subject of Object.keys(note)) {
    return {
      subject,
      note: note[subject],
      TodoUserId: userId,
    };
  }
};
