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
  const deleted = await isDeleteOrUpdate(id);
  if (deleted) {
    return ctx.body = {
      message: 'The note has been deleted!'
    };
  }
  return ctx.throw(404, 'This note does not exist!');
};


