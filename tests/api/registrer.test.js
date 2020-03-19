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
  if (!config.db.persistent) return false;
  const user = { login: 'test' };
  const testUser = await User.findOne({ where: user });
  testUser && await testUser.destroy();
  return true;
}



after(done => {
  additional()
    .then(done)
    .catch(done)
    .then(sequelize.close)
    .finally(process.exit);
});


describe('/api/register', () => {
  it('should return { "message": "Registration was successful!" } and status 201', done => {
    const body = JSON.stringify({
      login: 'test',
      password: '1',
    });
    assertRequest(body, 'POST', '/api/register')
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.message, 'Registration was successful!');
        assert.deepEqual(statusCode, 201);
      })
      .then(done)
      .catch(done);
  });

  it('should return { "error": "This login already exists!" } and status 400', done => {
    const body = JSON.stringify({
      login: 'test',
      password: '1',
    });
    assertRequest(body, 'POST', '/api/register')
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'This login already exists!');
        assert.deepEqual(statusCode, 400);
      })
      .then(done)
      .catch(done);
  });

  it('should return { "error": "The username and password fields must be filled in!" } and status 400', done => {
    const body = JSON.stringify({
      login: '',
      password: '',
    });
    assertRequest(body, 'POST', '/api/register')
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'The username and password fields must be filled in!');
        assert.deepEqual(statusCode, 400);
      })
      .then(done)
      .catch(done);

  });
});
