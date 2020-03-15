'use strict';

module.exports = function stop() {
  console.log({ message: 'Пока дружище' }, '\n');
  process.exit();
};
