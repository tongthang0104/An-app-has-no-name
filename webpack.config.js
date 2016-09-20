'use strict';
var Webpack = require('webpack');
var path = require('path');
var mainPath = path.resolve(__dirname, 'public','client', 'index.js');
var buildPath = path.resolve(__dirname, 'public', 'build');

const config = {
  entry: [

    //hot style updates
     'webpack/hot/dev-server',
     'webpack-dev-server/client?http://localhost:8080',
    './public/client/index.js'
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
