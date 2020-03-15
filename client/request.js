'use strict';

const http = require('http');
const { host, port } = require('../config');

module.exports = function request(path, method, body, token) {
  return new Promise((resolve, reject) => {
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
          return resolve(body);
        } catch (error) {
          reject(error);
        }
      });
    });
    request.write(body);
    request.on('finish', request.end);
  });
};

