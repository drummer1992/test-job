'use strict';

const uuid = require('uuid/v4');

class TodoItemLocal {
  static findById(id) {
    return TodoItemLocal._storage[id];
  }

  static create({ subject, note, TodoUserId }) {
    return new TodoItemLocal({ subject, note, TodoUserId });
  }

  static findAll() {
    const response = [];
    for (const id in TodoItemLocal._storage) {
      const todoListArr = TodoItemLocal._storage[id];
      response.push(...todoListArr);
    }
    return response;
  }

  static findAndUpdate(id, note, userId) {
    const todoList = TodoItemLocal._storage[userId];
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === id) {
        return todoList.splice(i, 1, this._map(id, note, userId));
      }
    }
  }

  static findAndDelete(id, userId) {
    const todoList = TodoItemLocal._storage[userId];
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === id) {
        return todoList.splice(i, 1);
      }
    }
  }

  static _map(id, note, userId) {
    for (const subject of Object.keys(note)) {
      return {
        id,
        subject,
        note: note[subject],
        TodoUserId: userId,
      };
    }
  };

  constructor({ id = uuid(), subject, note, TodoUserId }) {
    if (!subject || !note || !TodoUserId)
      throw new Error('All fields are required');
    if (!TodoItemLocal._storage[TodoUserId]) {
      TodoItemLocal._storage[TodoUserId] = [];
    }
    this.id = id;
    this.subject = subject;
    this.note = note;
    this.TodoUserId = TodoUserId;
    TodoItemLocal._storage[TodoUserId].push(this);
  }

}

Object.defineProperty(TodoItemLocal, '_storage', {
  value: {},
  writable: false,
  configurable: false,
  enumerable: false,
});

module.exports = TodoItemLocal;
