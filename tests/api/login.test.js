'use strict';

require('dotenv').config();
const config = require('../../config.js');
const { sequelize } = require('../../libs/connection');

const assert = require('assert');
const assertRequest = require('../assertRequest');

const User = require('../../models/sequelize/User');

before(done => {
  additional()
    .then(done)
    .catch(done);
});

async function additional() {
  if (!config.db.persistent) return;
  const user = { login: 'test' };
  const testUser = await User.findOne({ where: user });
  testUser && await testUser.destroy();
}



after(done => {
  additional()
    .then(done)
    .catch(done)
    .then(sequelize.close)
    .finally(process.exit);
});

describe('/api/login', () => {
  it('should return { "token": "some token" } and status 200', done => {
    const user = JSON.stringify({
      login: 'test',
      password: '1',
    });
    assertRequest({
      body: user,
      method: 'POST',
      path: '/api/register'
    })
      .then(() => assertRequest({
        body: user,
        method: 'POST',
        path: '/api/login'
      }))
      .then(({ response, statusCode }) => {
        const property = Object.keys(response)[0];
        assert.deepEqual(property, 'token');
        assert.deepEqual(response.token.length, 36);
        assert.deepEqual(statusCode, 200);
      })
      .then(done)
      .catch(done);
  });

  it('should return { "error": "The login and password fields must be filled in!" } and status 400', done => {
    const body = JSON.stringify({
      login: '',
      password: '',
    });
    assertRequest({
      body,
      method: 'POST',
      path: '/api/login'
    })
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'The login and password fields must be filled in!');
        assert.deepEqual(statusCode, 400);
      })
      .then(done)
      .catch(done);

  });

});
