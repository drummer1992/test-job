/* eslint-disable require-atomic-updates */
'use strict';

const isDeleteOrUpdate = require('./helper/isDeleteOrUpdate');

module.exports = async ctx => {
  const { id } = ctx.params;

  if (!id) {
    return ctx.throw(400, 'Вы не указали свойтво id в параметрах запроса');
  }
  const deleted = await isDeleteOrUpdate(id);
  if (deleted) {
    return ctx.body = {
      message: 'Заметка удалена!'
    };
  }
  return ctx.throw(404, 'Такой заметки не существует');
};


