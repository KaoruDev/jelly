var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var utils = require('../utils/');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var paths = require('../configs/shim/path-builder.js');

var devSass = function () {
  return createSassStream(true)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist + 'styles/'));
};

gulp.task('sass', ['clean:styles'], devSass);

gulp.task('sass:prod', ['clean:styles'], function () {
  return createSassStream(false)
    .pipe(cssnano())
    .pipe(gulp.dest(paths.dist + 'styles/'));
});

module.exports = devSass;

// private ==============================

function createSassStream(dev) {
  var stream = gulp.src(paths.styles + '**/*.scss');

  if (dev) {
    stream = stream.pipe(sourcemaps.init());
  }

  return stream
    .pipe(sass())
    .on('error', utils.handleError)
    .pipe(autoprefixer({ browsers: ['last 2 version']}));
}
