'use strict';

module.exports = ctx => {
  const { id } = ctx.params;

  if (!id) {
    ctx.throw(400, 'Вы не указали свойтво id в параметрах запроса');
  }

  const { todoList } = ctx.user;

  let deleted = false;

  todoList.forEach((item, i) => {
    if (item.id === id) {
      todoList.splice(i, 1);
      deleted = true;
    }
  });
  if (deleted) {
    return ctx.body = {
      message: 'Заметка удалена!'
    };
  }
  ctx.throw(404, 'Такой заметки не существует');
};
