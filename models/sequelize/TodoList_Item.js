'use strict';

const { DataTypes } = require('sequelize');

const sequelize = require('../../libs/connection');

const TodoItem = sequelize.define('TodoItem', {
  subject: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = TodoItem;
