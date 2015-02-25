var gulp = require('gulp');
var aws = require('gulp-awspublish');
var configs = require('../app-configs.js').aws;

gulp.task('deploy', function () {
  var publisher = aws.create(configs.bucket);

  return gulp.src(['./build/scripts/*.js', './build/styles/*.css'])
    .pipe(aws.gzip())
    .pipe(publisher.publish({}))
    .pipe(publisher.cache())
    .pipe(aws.reporter());
});

