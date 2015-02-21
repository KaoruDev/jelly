var gulp = require('gulp');
var utils = require('gulp-util');
var Browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var connect = require('gulp-connect');
var bundleConfigs = require('../app-configs.js').bundles;
var handleError = require('../utils/handle-error.js');
var sourcemaps = require('gulp-sourcemaps');
var _ = require('lodash');

var browserifyTask = function (callback, devMode) {
  bundleQueue = bundleConfigs.length;

  var browserifyFile = function (bundleConfig) {
    if (devMode) {
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

      var stream = browserify
        .bundle()
        .on('error', handleError)
        .pipe(source(bundleConfig.outputName));

      if (devMode) {
        stream = stream.pipe(buffer())
          .pipe(sourcemaps.init({loadMaps: true}))
          .pipe(sourcemaps.write('./'));
      }

      stream.pipe(gulp.dest(bundleConfig.dest))
        .on('end', bundleDone)
        .pipe(connect.reload());
    };

    if (devMode) {
      var watcher = watchify(browserify);
      watcher.on('update', bundle);
    }


    return bundle();
  };

  _.each(bundleConfigs, browserifyFile);
};

gulp.task('browserify', browserifyTask);
module.exports = browserifyTask;

