'use strict';
module.exports = {
  port: process.env.PORT || 3001,
  crypto: {
    length: 128,
    iterations: 1,
    digest: 'sha512'
  }
};
