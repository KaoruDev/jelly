var gulp = require('gulp');
var aws = require('gulp-awspublish');
var configs = require('../app-configs.js').aws;

gulp.task('deploy', ['build'], function () {
  var publisher = aws.create(configs.bucket);
  var folders = [
    {blob: './build/scripts/*.js', dir: '/scripts'},
    {blob: './build/styles/*.css', dir: '/styles'},
    {blob: './build/fonts/*', dir: '/fonts'}
  ]

  _.each(folders, function (configs) {
     gulp.src(configs.blob)
      .pipe(rename(function (path) {
        path.dirname += configs.dir
      }))
      .pipe(aws.gzip())
      .pipe(publisher.publish({}))
      .pipe(publisher.cache())
      .pipe(aws.reporter());
  });

});

