var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('server', ['watch'], function () {
  connect.server({
    port: 9000,
    root: 'build',
    livereload: true
  });
});

