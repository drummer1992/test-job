'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router({
  prefix: '/api'
});

const login = require('./controllers/login');
const register = require('./controllers/register');
const addTodo = require('./controllers/addTodo');
const updateTodo = require('./controllers/updateTodo');
const deleteTodo = require('./controllers/deleteTodo');
const todoList = require('./controllers/getTodoList');

const mustBeAuthenticate = require('./controllers/mustBeAuthenticate');

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = { error: err.message };
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }
});

app.use(bodyParser());

router.post('/login', login);

router.post('/register', register);

router.get('/todoList', mustBeAuthenticate, todoList);

router.post('/todoList', mustBeAuthenticate, addTodo);

router.delete('/todoList/:id', mustBeAuthenticate, deleteTodo);

router.put('/todoList/:id', mustBeAuthenticate, updateTodo);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(ctx => {
    ctx.status = 404;
    ctx.body = { error: 'Not Found' };
  });

module.exports = app;
