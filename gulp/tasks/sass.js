var gulp = require('gulp');
var configs = require('../app-configs.js').sass;
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var handleError = require('../utils/handle-error.js');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

gulp.task('sass', function () {
  return gulp.src(configs.src)
    .pipe(sourcemaps.init())
    .pipe(sass(configs.settings))
    .on('error', handleError)
    .pipe(autoprefixer({ browsers: ['last 2 version']}))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(configs.dest))
    .pipe(connect.reload());
});

