'use strict';
require('dotenv').config();

const { sequelize } = require('../libs/connection');

const User = require('../models/sequelize/User');
const TodoListItem = require('../models/sequelize/TodoList_Item');

async function createTables() {
  try {
    User.hasMany(TodoListItem);
    TodoListItem.belongsTo(User);
    await User.sync();
    await TodoListItem.sync();
    console.log('Done');
  } catch (error) {
    console.log(error);
  }
  sequelize.close();
}

createTables();
