'use strict';

const tokens = require('../db/tokens');
const uuid = require('uuid/v4');

module.exports = ctx => {
  const token = ctx.request.get('Authorization').split(' ')[1];
  if (!token) {
    return ctx.throw(400, 'Что бы добавить заметку нужно зарегистрироваться');
  }

  const user = tokens[token];
  if (!user) {
    ctx.throw(400, 'Пользователя с таким токеном не существует!');
  }

  const note = ctx.request.body;
  if (Object.keys(note).length === 0) {
    return ctx.throw(400, 'Тело запроса пустое, заметка не добавлена!');
  }
  note.id = uuid();
  user.todoList.push(note);
  ctx.body = { message: 'Заметка успешно добавлена!' };
};
