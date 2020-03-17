'use strict';

const isDeleteOrUpdate = require('./helper/isDeleteOrUpdate');

module.exports = async ctx => {
  const { id } = ctx.params;

  if (!id) {
    return ctx.throw(400, 'No id specified in query parameter!');
  }
  if (isNaN(+id)) {
    return ctx.throw(400, 'Id must be type of number!');
  }

  const note = ctx.request.body;

  if (Object.keys(note).includes('')) {
    return ctx.throw(400, 'Subject and notes are required fields for the request!');
  }

  const userId = ctx.user.id;

  const updated = await isDeleteOrUpdate(id, userId, note);

  if (updated) {
    return ctx.body = {
      message: 'Note updated!',
      note,
    };
  }
  return ctx.throw(404, 'This note does not exist!');
};
