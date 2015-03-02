var gulp = require('gulp');
var concat = require('gulp-concat-css');
var config = require('../app-configs.js').vendorCss;

gulp.task('vendor-css', function () {
  if (config[0]) {
    return gulp.src(config)
      .pipe(concat('vendor.scss'))
      .pipe(gulp.dest('tmp/'));
  }
});

