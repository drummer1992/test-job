'use strict';

const http = require('http');
const config = require('../config');

module.exports = function assertRequest(body, method, path) {
  const json = JSON.parse(body);
  const token = json.token;
  delete json.token;
  const _body = JSON.stringify(json);
  return new Promise(resolve => {
    const options = {
      port: config.port,
      host: config.host,
      method,
      path,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(_body),
        'Authorization': `Bearer ${token || ''}`,
      }
    };
    const request = http.request(options, res => {
      res.setEncoding('utf-8');
      res.on('data', chunk => {
        const response = JSON.parse(chunk);
        resolve({ response, statusCode: res.statusCode });
      });
    });
    request.write(_body);
    request.on('finish', request.end);
  });
};

