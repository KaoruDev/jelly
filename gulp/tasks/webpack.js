var _ = require('underscore');
var gulp = require('gulp');
var gutils = require('gulp-util');
var nn = require('node-notifier');
var paths = require('../configs/shim/path-builder');
var webpack = require('webpack');
var webpackConfigs = require('../configs/shim/webpack-configs.js');
var ws = require('webpack-stream');

//////////////////////////////////////////////////
//
//               Webpack Prod
//
//////////////////////////////////////////////////
//
gulp.task('webpack:prod', ['clean:scripts'], function () {
  gulp.src(paths.scripts + 'index.js')
    .pipe(ws(webpackConfigs.prod, webpack, function (err, stats) {
      handleWebpackStats(err, stats);
    }))
    .pipe(gulp.dest(paths.scripts));
});

//////////////////////////////////////////////////
//
//               Webpack Dev
//
//////////////////////////////////////////////////

gulp.task('webpack:dev', function () {
  gulp.src(paths.scripts + 'index.js')
    .pipe(ws(webpackConfigs.dev, webpack, function (err, stats) {
      handleWebpackStats(err, stats);
    }))
    .pipe(gulp.dest(paths.scripts));
});

// private ==============================

function handleWebpackStats(err, stats) {
  if (err) {
    console.log(gutils.colors.red(err));
  }

  if (!_.isEmpty(stats.compilation.errors)) {
    nn.notify({
      title: 'Webpack',
      message: 'Problem with web pack bub!',
      icon:  './node_modules/gulp-notify/assets/gulp-error.png',
    });

    _.each(stats.compilation.errors, function (error) {
      console.log('\n');
      console.log(gutils.colors.red(error.name));
      console.log(error.message);
      console.log(error.details);
      console.log('\n');
    });
  }
}

