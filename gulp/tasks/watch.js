var gulp = require('gulp');
var browserifyTask = require('./browserify');

gulp.task('watch', function (callback) {
  browserifyTask(callback, true);
});

