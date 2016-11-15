'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://' + defaultSettings.host + ':' + defaultSettings.port,
    './src/index'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("styles.css")
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.vue$/,
  loaders: ['vue'],
  include: [].concat(
    config.additionalPaths,
    [path.join(__dirname, '/../src')]
  )
});

module.exports = config;
