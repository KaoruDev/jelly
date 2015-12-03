var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var utils = require('../utils/');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var paths = require('../../tasks/configs/path-builder');

gulp.task('sass', ['vendor-css'], function () {
  return gulp.src(paths.styles + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', utils.handleError)
    .pipe(autoprefixer({ browsers: ['last 2 version']}))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist + 'styles/'))
    .pipe(connect.reload());
});

