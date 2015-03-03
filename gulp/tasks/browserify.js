var gulp = require('gulp');
var announce = require('../utils/announce.js');
var browserify = require('browserify');
var watchify = require('watchify');
var watch = require('gulp-watch');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var connect = require('gulp-connect');
var configs = require('../app-configs.js');
var bundleConfigs = configs.bundles;
var templateConfigs = configs.templates
var handleError = require('../utils/handle-error.js');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var JSTCompiler = require('./jst-compiler.js');
var _ = require('lodash');

var browserifyTask = function (callback, devMode) {
  var bundleQueue = bundleConfigs.length;
  var watchingTemplates = false;

  var browserifyFile = function (bundleConfig) {
    if (devMode) {
      bundleConfig = _.extend({}, bundleConfig, watchify.args, { debug: true });
    }

    var bundler = browserify(bundleConfig);
    var bundleDone = function () {
      announce('Bundle Complete.');

      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) callback(); // tells gulp task is done
      }
    };

    var bundle = function () {
      announce('Bundling...');
      var stream = bundler
        .bundle()
        .on('error', handleError)
        .pipe(source(bundleConfig.outputName));

      if (devMode) {
        stream = stream
          .pipe(buffer())
          .pipe(sourcemaps.init({loadMaps: true}))
          .pipe(sourcemaps.write('./'));
      } else {
        stream = stream
          .pipe(buffer())
          .pipe(uglify());
      }


      stream.pipe(gulp.dest(bundleConfig.dest))
        .on('end', bundleDone)
        .pipe(connect.reload());
    };

    if (devMode) {
      var watcher = watchify(bundler);
      watcher.on('update', function (files, args) {
        var compiledTemplates = _.any(files, function (file) {
          return file.search("scripts\/templates.js") >= 0
        });

        // Rebundle only if there were no changes to templates.js
        if (!compiledTemplates) {
          bundle();
        }
      });

      if (!watchingTemplates) {
        watchingTemplates = true;
        gulp.src(templateConfigs.src + '*jst')
          .pipe(watch(templateConfigs.src + '*.jst', {}, function () {
            JSTCompiler(bundle);
          }));
      }
    }

    return bundle();
  };

  _.each(bundleConfigs, browserifyFile);
};

gulp.task('browserify', ['JST'], browserifyTask);
module.exports = browserifyTask;

