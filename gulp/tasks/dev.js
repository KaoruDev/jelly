var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var paths = require('../configs/shim/path-builder.js');
var devSass = require('./sass.js');
var htmls = require('./htmls.js');
var watch = require('gulp-watch');

gulp.task('dev', ['htmls', 'sass', 'webpack:dev'], function () {

  browserSync.init({
    open: false,
    server: paths.dist,
  });

  watch(`${paths.styles}**/\*.scss`, function () {
    devSass().pipe(browserSync.stream());
  });

  watch(`${paths.htmls}**/\*.html`, function () {
    htmls().pipe(browserSync.stream());
  });

  watch(`${paths.dist}scripts/\**/\*.js`, function () {
    browserSync.reload('*.js');
  });
});

