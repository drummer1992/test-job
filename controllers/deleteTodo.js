'use strict';

const { isDeleteOrUpdate, isValidUUID } = require('./helper');

const isUUID = require('is-uuid');

module.exports = async ctx => {
  const { id } = ctx.params;
  if (!isUUID.v4(id)) {
    return ctx.throw(400, 'Invalid id!');
  }
  const user = ctx.user;

  const deleted = await isDeleteOrUpdate(id, user);
  if (!deleted) {
    return ctx.throw(404, 'This note does not exist!');
  }
  return ctx.body = {
    message: 'The note has been deleted!'
  };
};


