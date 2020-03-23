'use strict';

const { DataTypes } = require('sequelize');

const { sequelize } = require('../../libs/connection');

const TodoItem = sequelize.define('TodoItem', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
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

TodoItem._map = function _map(id, note, userId) {
  for (const subject of Object.keys(note)) {
    return {
      id,
      subject,
      note: note[subject],
      TodoUserId: userId,
    };
  }
};

module.exports = TodoItem;

