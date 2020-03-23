'use strict';
module.exports = function stop() {
  console.log({ message: 'Bye bye!' }, '\n');
  process.exit();
};
