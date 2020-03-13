'use strict';

const app = require('./app');
const { port } = require('./config');

app.listen(port, () => {
  console.log(`HTTP server running: http://localhost:${port}`);
});
