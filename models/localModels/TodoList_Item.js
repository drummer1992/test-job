'use strict';

const uuid = require('uuid/v4');

class ListItem {
  constructor({ subject, note, TodoUserId }) {
    this.id = uuid();
    this.subject = subject;
    this.note = note;
    this.TodoUserId = TodoUserId;
  }
}

module.exports = ListItem;
