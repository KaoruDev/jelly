var gulp = require('gulp');
var del = require('del');
var paths = require('../configs/shim/path-builder');

gulp.task('clean:styles', function () {
  del.sync(paths.styles);
});

