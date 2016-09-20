'use strict';
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../../webpack.config.js');
const path = require('path');
const fs = require('fs');
const mainPath = path.resolve(__dirname, '..', 'client', 'index.js');

module.exports = function() {
  let bundleStart = null;
  let compiler = new Webpack(webpackConfig);

  compiler.plugin('compile', function() {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', function() {
    console.log(`Bundled in ${(Date.now() - bundleStart) + 'ms!'}`);
  });

  let bundler = new WebpackDevServer(compiler, {
    publicPath: '/build/',
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  bundler.listen(8080, 'localhost', function() {
    console.log('Bundling Project, please wait.....');
  });
};
