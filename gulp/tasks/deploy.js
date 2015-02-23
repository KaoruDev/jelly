var gulp = require('gulp');
var aws = require('gulp-awspublish');
var configs = require('../app-configs.js').aws;

gulp.task('deploy', ['build'], function () {
  var publisher = aws.create(configs.bucket);

  return gulp.src('./build/**/*')
    .pipe(aws.gzip())
    .pipe(publisher.publish({}))
    .pipe(publisher.cache())
    .pipe(aws.reporter());
});

