'use strict';

const { isDeleteOrUpdate, isValidUUID } = require('./helper');

module.exports = async ctx => {
  const { id } = ctx.params;

  if (!id) {
    return ctx.throw(400, 'No id specified in query parameter!');
  }

  if (!isValidUUID(id)) {
    return ctx.throw(400, 'Invalid id!');
  }

  const note = ctx.request.body;

  if (Object.keys(note).includes('')) {
    return ctx.throw(400, 'Subject and notes are required fields for the request!');
  }

  const user = ctx.user;

  const updated = await isDeleteOrUpdate(id, user, note);

  if (!updated) {
    return ctx.throw(404, 'This note does not exist!');
  }

  return ctx.body = {
    message: 'Note updated!',
    note,
  };
};
