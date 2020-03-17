'use strict';

const todoList = require('../../db/todoList');
const maper = require('../../mappers/createOrUpdateTodo');
const { db: { persistent } } = require('../../config');

const TodoListItem = require('../../models/localModels/TodoList_Item');
const TodoList_Item = require('../../models/sequelize/TodoList_Item');

module.exports = async function isDeleteOrUpdate(id, userId, data) {
  if (!persistent) {
    const notes = todoList[userId];
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        return data ?
          notes.splice(i, 1, new TodoListItem(data)) :
          notes.splice(i, 1);
      }
    }
  }

  if (!data) {
    const todo = await await TodoList_Item.findByPk(id);
    return todo ?
      await todo.destroy() :
      null;
  }
  const todo = await TodoList_Item.findByPk(id);
  return todo ?
    await todo.update(maper(data, userId)) :
    null;
};
