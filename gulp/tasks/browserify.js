var gulp = require('gulp');
var utils = require('gulp-util');
var Browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var bundleConfigs = require('../app-configs.js').bundles;
var handleError = require('../utils/handle-error.js');
var _ = require('lodash');

var browserifyTask = function (callback, devMode) {
  bundleQueue = bundleConfigs.length;

  var browserifyFile = function (bundleConfig) {
    if (devMode || true) {
      bundleConfig = _.extend({}, bundleConfig, watchify.args, { debug: true });
    }

    var browserify = Browserify(bundleConfig);

    var bundleDone = function () {
      utils.log("Bundle Complete");
      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) callback(); // tells gulp task is done
      }
    };

    var bundle = function () {
      utils.log("Bundle Initiatied");
      return browserify
        .bundle()
        .on('error', handleError)
        .pipe(source(bundleConfig.outputName))
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', bundleDone)
        .pipe(connect.reload());
    };

    if (devMode || true) {
      var watcher = watchify(browserify);
      watcher.on('update', bundle);
    }


    return bundle();
  };

  utils.log("Bundle Configs: ", bundleConfigs);
  _.each(bundleConfigs, browserifyFile);
};

gulp.task('browserify', browserifyTask);
module.exports = browserifyTask;

