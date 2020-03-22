'use strict';

const http = require('http');
const { host, port } = require('../config');
const storage = require('./token');

module.exports = function request(path, method, body, token) {
  return new Promise(resolve => {
    const options = {
      port,
      host,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      }
    };
    if (token) {
      options.headers['Authorization'] = token;
    }
    const request = http.request(options, res => {
      res.setEncoding('utf8');
      res.on('data', chunk => {
        try {
          const body = JSON.parse(chunk);
          if (body.token) {
            storage.token = body.token;
            return resolve({ message: 'You have successfully authenticated!' });
          }
          return resolve(body);
        } catch (error) {
          return resolve(chunk);
        }
      });
    });
    request.write(body);
    request.on('finish', request.end);
    request.on('error', error => {
      if (error.code === 'ECONNREFUSED') {
        console.log(host, port);
        console.log({ message: 'No connection to server!' });
        process.exit();
      }
    });
  });
};

