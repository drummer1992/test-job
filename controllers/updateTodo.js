/* eslint-disable require-atomic-updates */
'use strict';

const isDeleteOrUpdate = require('./helper/isDeleteOrUpdate');

module.exports = async ctx => {
  const { id } = ctx.params;

  if (!id) {
    return ctx.throw(400, 'Вы не указали свойтво id в параметрах запроса');
  }

  const note = ctx.request.body;

  if (Object.keys(note).includes('')) {
    return ctx.throw(400, 'Тело запроса пустое или некорректно заполнено, заметка не обновлена!');
  }

  const userId = ctx.user.id;

  const updated = await isDeleteOrUpdate(id, userId, note);

  if (updated) {
    return ctx.body = {
      message: 'Заметка обновлена!',
      note,
    };
  }
  return ctx.throw(404, 'Такой заметки не существует');
};
