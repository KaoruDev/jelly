var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var utils = require('../utils/');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var paths = require('../configs/shim/path-builder.js');

var devSass = function () {
  return createSassStream()
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist + 'styles/'));
};

gulp.task('sass', ['clean:sass'], devSass);

gulp.task('sass:prod', ['clean:sass'], function () {
  return createSassStream()
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist + 'styles/'));
});

module.exports = devSass;

// private ==============================

function createSassStream() {
  return gulp.src(paths.styles + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', utils.handleError)
    .pipe(autoprefixer({ browsers: ['last 2 version']}));
}
