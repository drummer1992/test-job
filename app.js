
'use strict';

require('dotenv').config();
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
const todoList = require('./controllers/todoList');

const mustBeAuthenticate = require('./controllers/mustBeAuthenticate');

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error.status) {
      return ctx.body = {
        error: error.message
      };
    }
    console.log(error);
    ctx.body = {
      error: 'Internal server error',
    };
  }
});

router.post('/login', login);

router.post('/register', register);

router.get('/todoList', todoList);

router.post('/addTodo', addTodo);

router.delete('/deleteTodo/:id', mustBeAuthenticate, deleteTodo);

router.put('/updateTodo/:id', mustBeAuthenticate, updateTodo);

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
