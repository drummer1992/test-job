'use strict';

module.exports = ctx => {
  const { id } = ctx.params;

  if (!id) {
    ctx.throw(400, 'Вы не указали свойтво id в параметрах запроса');
  }
  const { todoList } = ctx.user;

  const note = ctx.request.body;

  if (Object.keys(note).length === 0) {
    return ctx.throw(400, 'Тело запроса пустое, заметка не добавлена!');
  }
  note.id = id;

  let updated = false;

  todoList.forEach((item, i) => {
    if (item.id === id) {
      todoList.splice(i, 1, note);
      updated = true;
    }
  });
  if (updated) {
    return ctx.body = {
      message: 'Заметка обновлена!',
      note,
    };
  }
  ctx.throw(404, 'Такой заметки не существует');
};
