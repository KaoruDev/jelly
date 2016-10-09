const webpack = require('webpack');
const paths = require('../path-builder');
const _ = require('underscore');

const base = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
      },
    ],
  },
  resolve: {
    root: paths.repoRoot,
    fallback: [paths.scripts],
    alias: {
      styles: paths.styles,
      helpers: `${paths.repoRoot}/specs/spec_helpers`,
      vendors: `${paths.repoRoot}/lib/scripts/vendors`,
      jelly: `${paths.repoRoot}/jelly/lib/scripts`,
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

module.exports = {
  dev: _.extend({
    entry: [
      `${paths.scripts}/index.js`,
    ],
    devtool: 'inline-source-map',
    output: {
      path: '/',
      publicPath: '/assets/',
      filename: 'bundle.js',
    },
    plugins: _.union(base.plugins, [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.NoErrorsPlugin(),
    ]),
  }, base),

  test: _.extend({
    entry: `${paths.specs}/spec-runner.js`,
    devtool: 'inline-source-map',
    output: {
      path: '/',
      publicPath: '/assets/',
      filename: 'spec-bundle.js',
    },
    plugins: _.union(base.plugins, [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.NoErrorsPlugin(),
    ]),
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
