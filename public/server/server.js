'use strict';
const express = require('express');
require('./mongo.config');
const app = express();
const path = require('path');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

const isProduction= process.env.NODE_ENV === 'production';

const publicPath = path.resolve(__dirname, '../..');
let port = isProduction ? process.env.PORT : 9999;

if (!isProduction) {
  const bundle = require('./bundler');
  bundle();

  app.all('/build/*', function(req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });

  // app.all('/db/*', function (req, res) {
  //   proxy.web(req, res, {
  //     target: 'http://localhost:9999/api'
  //   });
  // });
}

proxy.on('error', function(err) {
  console.error(err);
  console.log('Could not connect to proxy, please try again...');
});

require('./middleware')(app, express);

app.use(express.static(publicPath));

app.listen(port, function(){
  console.log(`Server is running on ${port}`);
});
