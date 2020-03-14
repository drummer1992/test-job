'use strict';

const uuid = require('uuid/v4');

class ListItem {
  constructor(note) {
    this.id = uuid();
    this.note = note;
  }
}

module.exports = ListItem;
