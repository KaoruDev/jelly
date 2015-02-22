var gulp = require('gulp');
var watch = require('gulp-watch');
var browserifyTask = require('./browserify');
var connect = require('gulp-connect');
var configs = require('../app-configs.js');

gulp.task('watch', function (callback) {
  browserifyTask(callback, true);

  gulp.src(configs.sass.src)
    .pipe(watch(configs.sass.src, {}, function (vinyl) {
      gulp.start('sass');
    }));
});

