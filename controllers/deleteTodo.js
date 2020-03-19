'use strict';

const { isDeleteOrUpdate } = require('./helper');

module.exports = async ctx => {
  const { id } = ctx.params;

  const user = ctx.user;

  const deleted = await isDeleteOrUpdate(id, user);
  if (!deleted) {
    return ctx.throw(404, 'This note does not exist!');
  }
  return ctx.body = {
    message: 'The note has been deleted!'
  };
};


