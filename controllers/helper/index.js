'use strict';

const uuid = require('uuid/v4');
const todoList = require('../../db/todoList');
const maper = require('../../mappers/createOrUpdateTodo');
const { db: { persistent } } = require('../../config');

const TodoListItem = require('../../models/localModels/TodoList_Item');
const TodoList_Item = require('../../models/sequelize/TodoList_Item');

module.exports.isDeleteOrUpdate = async function isDeleteOrUpdate(id, user, note) {
  if (!persistent) {
    if (!user.isAdmin) {
      const notes = todoList[user.id];
      return findTodoItemAndDeleteOrUpdate(notes, id, user, note);
    }
    // if isAdmin === true
    for (const userId in todoList) {
      const notes = todoList[userId];
      const isOk = findTodoItemAndDeleteOrUpdate(notes, id, user, note);
      if (isOk) return isOk;
    }
    return null;
  }

  if (!note) {
    const todo = await await TodoList_Item.findByPk(id);
    return todo ?
      await todo.destroy() :
      null;
  }
  const todo = await TodoList_Item.findByPk(id);
  return todo ?
    await todo.update(maper(note, user.id)) :
    null;
};

function findTodoItemAndDeleteOrUpdate(notes, id, user, note) {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      return note ?
        notes.splice(i, 1, new TodoListItem(maper(note, user.id))) :
        notes.splice(i, 1);
    }
  }
  return null;
}

module.exports.isValidUUID = id => id.length === uuid().length;
