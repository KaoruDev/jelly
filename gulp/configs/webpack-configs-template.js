var webpack = require('webpack');
var paths = require('../path-builder');
var _ = require('underscore');

var base = {
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.ejs$/, exclude: /node_modules/, loader: 'ejs-compiled' },
    ],
  },
  resolve: {
    root: paths.repoRoot,
    fallback: [paths.repoRoot + '/scripts'],
    alias: {
      helpers: paths.repoRoot + '/specs/spec_helpers',
      vendors: paths.repoRoot + '/lib/scripts/vendors',
      jelly: paths.repoRoot + '/jelly/lib/scripts',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'underscore',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),

    // do not include all of moment's timezones
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};

//////////////////////////////////////////////////
//
//                   Exports
//
//////////////////////////////////////////////////

var exports = {
  dev: _.extend({
    entry: `${paths.scripts}/index.js`,
    devtool: 'eval-source-map',
    watch: true,
    output: {
      path: `${paths.dist}scripts`,
      filename: 'bundle.js',
    },
  }, base),

  test: _.extend({
    entry: `${paths.specs}/spec-runner.js`,
    devtool: 'inline-source-map',
    output: {
      path: `${paths.specs}`,
      filename: 'spec-bundle.js',
    },
  }, base),

  prod: _.extend({
    plugins: _.union(base.plugins, [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        sourceMap: false,
      }),
    ]),
  }, base),
};

module.exports = exports;
