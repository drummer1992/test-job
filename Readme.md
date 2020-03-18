# TodoListApp cli-client / server

- RESTful API on Koa.js
- Authorization by login / password (Passport.js)
- Config have option to switch between in memory storage and persistent storage
- CLI client on Raw Node.js
- Connects to the server and manages TodoList-Items (__CRUD__)



From the begining you must:

_1:_ Create database __todolist_app__ in PostgresSQL DB :

_2_: Change config file: 

__ps__: username_for_database must be YOUR __username__

__path__: at the root of the application folder ./config.js

```js
  db: {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'todolist_app',
    username: process.env.DB_USER_NAME || 'username_for_database',
    persistent: !!process.argv[2] || false,
  }
```

_3:_ Create all tables with script:

At the root of the application folder, type:

__node ./fixtures/createTables.js__


_4_: Start server:

At the root of the application folder, type:

__4.1__:

__npm start__ === store server items in-memory

OR

__4.2__:

__npm start true__ === store server items in persistent storage

_5_: Start cli-client app:

__node ./client/main.js__


__Client CLI__ <br>


|          Command          |       Description         |
|---------------------------|---------------------------|
|         register          |    User registration      |
|         login             |   User authentication     |
|         create            |    To create a note       |
|         read              |     View all notes        |
|         update            |     Update the note       |
|         delete            |     Delete the note       |
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
