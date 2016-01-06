var gulp = require('gulp');

gulp.task('dev', ['htmls', 'sass', 'webpack:dev'], function () {
  return gulp.start('watch');
});

