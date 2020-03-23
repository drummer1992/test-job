'use strict';
const config = require('../../config.js');
const { sequelize } = require('../../libs/connection');

const assert = require('assert');
const assertRequest = require('../assertRequest');

const User = require('../../models/sequelize/User');


const storage = { token: '', id: '', body: {/*{
  'test': 'crazyTest',
} */ } };


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



describe('/api/todoList', () => {
  it('POST: should return { "message": "Note added successfully!" } and status 201', done => {
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
      .then(({ response: { token } }) => {
        storage.token = token;
        storage.body = JSON.stringify({
          'test': 'crazyTest'
        });
        return assertRequest({
          token: storage.token,
          method: 'POST',
          path: '/api/todoList',
          body: storage.body,
        });
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
    assertRequest({
      body,
      token: '',
      method: 'GET',
      path: '/api/todoList',
    })
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'Invalid token!');
        assert.deepEqual(statusCode, 401);
      })
      .then(done)
      .catch(done);
  });

  it(`GET: should return { error: "Invalid token!" } and status 401
  if invalid token`, done => {
    const body = JSON.stringify({  });
    assertRequest({
      body,
      token: '1'.repeat(36),
      method: 'GET',
      path: '/api/todoList',
    })
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'Invalid token!');
        assert.deepEqual(statusCode, 401);
      })
      .then(done)
      .catch(done);
  });

  it('GET: should return view all notes and status 200', done => {
    const body = JSON.stringify({  });

    assertRequest({
      body,
      token: storage.token,
      method: 'GET',
      path: '/api/todoList',
    })
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
    const body = JSON.stringify({  });
    assertRequest({
      body,
      token: storage.token,
      method: 'PUT',
      path: `/api/todoList/${storage.id}`,
    })
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'Subject and notes are required fields for the request!');
        assert.deepEqual(statusCode, 400);
      })
      .then(done)
      .catch(done);
  });

  it('PUT: should return { "message": "Note updated!" and status 200 }', done => {
    const body = JSON.stringify({
      'test': 'update',
    });
    assertRequest({
      body,
      token: storage.token,
      method: 'PUT',
      path: `/api/todoList/${storage.id}`,
    })
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
    const body = JSON.stringify({  });
    assertRequest({
      body,
      token: storage.token,
      method: 'PUT',
      path: '/api/todoList/1',
    })
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
      'test': 'update',
    });
    assertRequest({
      body,
      token: storage.token,
      method: 'PUT',
      path: `/api/todoList/${'1'.repeat(36)}`,
    })
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'Invalid id!');
        assert.deepEqual(statusCode, 400);
      })
      .then(done)
      .catch(done);
  });

  it(`DELETE: should return { error: "Invalid id" } and status 400 }
    if invalid id`, done => {
    const body = JSON.stringify({  });
    assertRequest({
      body,
      token: storage.token,
      method: 'DELETE',
      path: '/api/todoList/1',
    })
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'Invalid id!');
        assert.deepEqual(statusCode, 400);
      })
      .then(done)
      .catch(done);
  });

  it(`DELETE: should return { error: "Invalid id!" } and status 404 }
    if invalid id`, done => {
    const body = JSON.stringify({  });
    assertRequest({
      body,
      token: storage.token,
      method: 'DELETE',
      path: `/api/todoList/${'1'.repeat(36)}`,
    })
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.error, 'Invalid id!');
        assert.deepEqual(statusCode, 400);
      })
      .then(done)
      .catch(done);
  });

  it('DELETE: should return { message: "The note has been deleted!" } and status 200', done => {
    const body = JSON.stringify({  });
    assertRequest({
      body,
      token: storage.token,
      method: 'GET',
      path: '/api/todoList',
    })
      .then(({ response }) => {
        const user = Object.keys(response)[0];
        return response[user][0].id;
      })
      .then(id => assertRequest({
        body,
        token: storage.token,
        method: 'DELETE',
        path: `/api/todoList/${id}`,
      }))
      .then(({ response, statusCode }) => {
        assert.deepEqual(response.message, 'The note has been deleted!');
        assert.deepEqual(statusCode, 200);
      })
      .then(done)
      .catch(done);
  });

});
