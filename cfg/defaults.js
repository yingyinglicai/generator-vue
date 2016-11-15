/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';
const host = require('./utils');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;

//判断当前环境
var isProduction = function () {
  return process.env.VUE_WEBPACK_ENV.replace(/^\s+|\s+$/g, "") === 'dist';
};

const devPublicPath = "/assets/";
const proPublicPath = "./";


function getDefaultModules() {
  return {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: srcPath,
        loader: 'babel-loader',
        query: {
          "presets": ["es2015"]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract("style", "css!postcss!sass")
      },
      {
        test: /\.sass/,
        loader: ExtractTextPlugin.extract("style", "css!postcss!sass")
      },
      {
        test: /\.(png|jpg|gif|ttf)$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: "imgs/[name].[ext]"
        }
      },
      {
        test: /\.(mp3|mp4)$/,
        loader: 'file-loader',
        query: {
          name: "media/[name].[ext]"
        }
      },
      {
        test: /\.woff$/,
        loader: "url-loader?prefix=font/&name=font/[name].[ext]&limit=5000&mimetype=application/font-woff"},
      {
        test: /\.ttf$/,
        loader: "file-loader?prefix=font/&name=font/[name].[ext]"
      },
      {
        test: /\.eot$/,
        loader: "file-loader?prefix=font/&name=font/[name].[ext]"
      },
      {
        test: /\.svg$/,
        loader: "file-loader?prefix=font/&name=font/[name].[ext]"
      }
    ]
  }
    ;
}

module.exports = {
  srcPath: srcPath,
  publicPath: isProduction() ? proPublicPath : devPublicPath,
  host: host.ip,
  port: dfltPort,
  getDefaultModules: getDefaultModules
};
