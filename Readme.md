# TodoListApp cli-client / server

- RESTful API on Koa.js
- Authorization by login / password (Passport.js)
- Config have option to switch between in memory storage and persistent storage
- CLI client on Raw Node.js
- Chat for authorized users, with WebSocket protocol and the socket.io library
- Connects to the server and manages TodoList-Items (__CRUD__)
- p/s: "admin" user can manage all items



__Start TodoListApp with inMemory storage:__

At the root of the application folder, type:

- __npm start__

__Run tests:__

- __npm test__


__Start TodoListApp with persistent storage:__

From the begining you must:

- Create database __todolist_app__ in PostgresSQL DB

- Change config file: ./config.js

username: 

username for database must be __YOUR USERNAME__

persistent:

true => store server items in persistent storage

- Create sequelize moodels:

At the root of the application folder, type:

- node ./fixtures/createTables.js

__Start App :__

- __npm start__

__Run tests:__

- __npm test__

```js
  db: {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'todolist_app',
    username: process.env.DB_USER_NAME || 'username_for_database',
    persistent: false,
  }
```


__Client CLI__ <br>


|          Command          |       Description         |
|---------------------------|---------------------------|
|         register          |    User registration      |
|         login             |   User authentication     |
|         create            |    To create a note       |
|         read              |     View all notes        |
|         update            |     Update the note       |
|         delete            |     Delete the note       |
|         chat              |       Go to chat          |
|         stop              |          Exit             |


__Server API__ <br>


| Method  | Route           | Description                | Parameter  | isRequiredToken  |
|---------|-----------------|----------------------------|-------------|-----------------|
| POST    | /api/register   | User registration          |     --      |     false       |
| POST    | /api/login      | User authentication        |     --      |     false       |
| POST    | /api/todoList   | To create a note           |     --      |     true        |
| GET     | /api/todoList   | View all notes             |     --      |     true        |
| PUT     | /api/todoList/: | Update the note            |     id      |     true        |
| DELETE  | /api/todoList/: | Delete the note            |     id      |     true        |

<br>

__Example of requests__:
```js
// POST /api/register

// REQUEST:
{
	"login": "andrey",
	"password": "secret"
}

// RESPONSE

{
    "message": "Registration was successful!"
}


// ====================


// POST /api/login

// REQUEST:
{
	"login": "andrey",
	"password": "secret"
}

// RESPONSE:

{
    "token": "e8f0b208-cedb-4aa9-9146-3a8ab15a733a"
}


// =====================


// POST /api/todoList

// REQUEST:

// Authorization header required:

'Bearer e8f0b208-cedb-4aa9-9146-3a8ab15a733a'

// BODY:
{
	"it": "learn JS"
}

// RESPONSE:
 
{
    "message": "Note added successfully!"
}


// ====================


// GET /api/todoList

// REQUEST:

// Authorization header required:

'Bearer e8f0b208-cedb-4aa9-9146-3a8ab15a733a'

// RESPONSE
{
    "andrey": [
        {
            "id": 8,
            "subject": "it",
            "note": "learn JS",
            "TodoUserId": 9
        }
    ]
}


// ====================


// PUT /api/todoList/:8

// REQUEST:

// Authorization header required:

'Bearer e8f0b208-cedb-4aa9-9146-3a8ab15a733a'

// BODY:
{
	"it": "learn Node.js"
}

// RESPONSE:
 
 {
    "message": "Note updated!",
    "note": {
        "it": "learn Node.js"
    }
}


// ====================


// DELETE /api/todoList/:8

// REQUEST:

// Authorization header required:

'Bearer e8f0b208-cedb-4aa9-9146-3a8ab15a733a'


// RESPONSE:
 
{
    "message": "The note has been deleted!"
}

```
