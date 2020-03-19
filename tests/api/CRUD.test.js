'use strict';

require('dotenv').config();
const config = require('../../config.js');
const { sequelize } = require('../../libs/connection');

const assert = require('assert');
const assertRequest = require('../assertRequest');

const User = require('../../models/sequelize/User');


const storage = { token: '', id: '', body: {/*{
  'test': 'crazyTest',
  token,
} */ } };


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



describe('/api/todoList', () => {
  it('POST: should return { "message": "Note added successfully!" } and status 201', done => {
    const user = JSON.stringify({
      login: 'test',
      password: '1',
    });
    assertRequest(user, 'POST', '/api/register')
      .then(() => assertRequest(user, 'POST', '/api/login'))
      .then(({ response: { token } }) => {
        storage.token = token;
        storage.body = JSON.stringify({
          'test': 'crazyTest',
          token,
        });
        return assertRequest(storage.body, 'POST', '/api/todoList');
      })
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.message, 'Note added successfully!');
        assert.deepEqual(statusCode, 201);
      })
      .then(done)
      .catch(done);
  });

  it(`GET: should return { error: "Invalid token!" } and status 401
  if no token is sent`, done => {
    const body = JSON.stringify({  });
    assertRequest(body, 'GET', '/api/todoList')
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'Invalid token!');
        assert.deepEqual(statusCode, 401);
      })
      .then(done)
      .catch(done);
  });

  it(`GET: should return { error: "Invalid token!" } and status 401
  if invalid token`, done => {
    const body = JSON.stringify({
      token: '1'.repeat(36),
    });
    assertRequest(body, 'GET', '/api/todoList')
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'Invalid token!');
        assert.deepEqual(statusCode, 401);
      })
      .then(done)
      .catch(done);
  });

  it('GET: should return view all notes and status 200', done => {
    const body = JSON.stringify({
      token: storage.token
    });
    assertRequest(body, 'GET', '/api/todoList')
      .then(({ response, statusCode }) => {
        const user = Object.keys(response)[0];
        assert.deepEqual(user, 'test');
        assert.deepEqual(response[user][0].note, 'crazyTest');
        assert.deepEqual(statusCode, 200);
        storage.id = response[user][0].id;
      })
      .then(done)
      .catch(done);
  });

  // eslint-disable-next-line max-len
  it('PUT: should return { "message": "Subject and notes are required fields for the request!" and status 400 }', done => {
    const body = JSON.stringify({
      token: storage.token,
    });
    assertRequest(body, 'PUT', `/api/todoList/${storage.id}`)
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'Subject and notes are required fields for the request!');
        assert.deepEqual(statusCode, 400);
      })
      .then(done)
      .catch(done);
  });

  it('PUT: should return { "message": "Note updated!" and status 200 }', done => {
    const body = JSON.stringify({
      token: storage.token,
      'test': 'update',
    });
    assertRequest(body, 'PUT', `/api/todoList/${storage.id}`)
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.message, 'Note updated!');
        assert.deepEqual(response.note.test, 'update');
        assert.deepEqual(statusCode, 200);
      })
      .then(done)
      .catch(done);
  });

  it(`PUT: should return { error: "Invalid id" } and status 200 }
    if invalid id`, done => {
    const body = JSON.stringify({
      token: storage.token,
    });
    assertRequest(body, 'PUT', '/api/todoList/1')
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'Invalid id!');
        assert.deepEqual(statusCode, 400);
      })
      .then(done)
      .catch(done);
  });

  it(`PUT: should return { error: "Invalid id" } and status 400 }
    if invalid id`, done => {
    const body = JSON.stringify({
      token: storage.token,
      'test': 'update',
    });
    assertRequest(body, 'PUT', `/api/todoList/${'1'.repeat(36)}`)
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'Invalid id!');
        assert.deepEqual(statusCode, 400);
      })
      .then(done)
      .catch(done);
  });

  it(`DELETE: should return { error: "Invalid id" } and status 400 }
    if invalid id`, done => {
    const body = JSON.stringify({
      token: storage.token,
    });
    assertRequest(body, 'DELETE', '/api/todoList/1')
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'Invalid id!');
        assert.deepEqual(statusCode, 400);
      })
      .then(done)
      .catch(done);
  });

  it(`DELETE: should return { error: "Invalid id!" } and status 404 }
    if invalid id`, done => {
    const body = JSON.stringify({
      token: storage.token,
    });
    assertRequest(body, 'DELETE', `/api/todoList/${'1'.repeat(36)}`)
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'Invalid id!');
        assert.deepEqual(statusCode, 400);
      })
      .then(done)
      .catch(done);
  });

  it('DELETE: should return { message: "The note has been deleted!" } and status 200', done => {
    const body = JSON.stringify({
      token: storage.token
    });
    assertRequest(body, 'GET', '/api/todoList')
      .then(({ response }) => {
        const user = Object.keys(response)[0];
        return response[user][0].id;
      })
      .then(id => assertRequest(JSON.stringify({ token: storage.token }), 'DELETE', `/api/todoList/${id}`))
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.message, 'The note has been deleted!');
        assert.deepEqual(statusCode, 200);
      })
      .then(done)
      .catch(done);
  });

});
