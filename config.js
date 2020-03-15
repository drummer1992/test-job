'use strict';
module.exports = {
  port: process.env.PORT || 3000,
  host: 'localhost',
  crypto: {
    length: 128,
    iterations: 1,
    digest: 'sha512'
  }
};
