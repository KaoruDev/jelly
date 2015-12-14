var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var paths = require('../configs/shim/path-builder.js');
var devSass = require('./sass.js');
var watch = require('gulp-watch');

gulp.task('dev', ['sass'], function () {

  browserSync.init({
    open: false,
    server: paths.dist,
  });

  watch(`${paths.styles}**/*.scss`, function () {
    devSass().pipe(browserSync.stream());
  });
});

