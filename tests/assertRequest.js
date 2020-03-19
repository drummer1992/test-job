'use strict';

const http = require('http');
const config = require('../config');

module.exports = function assertRequest({ token = '', body, method, path }) {
  return new Promise(resolve => {
    const options = {
      port: config.port,
      host: config.host,
      method,
      path,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Authorization': `Bearer ${token}`,
      }
    };
    const request = http.request(options, res => {
      res.setEncoding('utf-8');
      res.on('data', chunk => {
        const response = JSON.parse(chunk);
        resolve({ response, statusCode: res.statusCode });
      });
    });
    // console.log({ token, method, path, body });
    request.write(body);
    request.on('finish', request.end);
  });
};

