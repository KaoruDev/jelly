var gulp = require('gulp');
var browserifyTask = require('./browserify');
var connect = require('gulp-connect');
var configs = require('../app-configs.js');

gulp.task('watch', function (callback) {
  browserifyTask(callback, true);
  gulp.watch(configs.sass.src, ['sass']);
});

