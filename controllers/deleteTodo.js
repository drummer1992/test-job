'use strict';

const isDeleteOrUpdate = require('./helper/isDeleteOrUpdate');

module.exports = async ctx => {
  const { id } = ctx.params;

  if (!id) {
    return ctx.throw(400, 'No id specified in query parameter!');
  }

  const userId = ctx.user.id;

  const deleted = await isDeleteOrUpdate(id, userId);
  if (deleted) {
    return ctx.body = {
      message: 'The note has been deleted!'
    };
  }
  return ctx.throw(404, 'This note does not exist!');
};


