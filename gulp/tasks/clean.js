var gulp = require('gulp');
var del = require('del');
var paths = require('../configs/shim/path-builder');

gulp.task('clean:styles', function (done) {
  del.sync(paths.dist + 'styles/');
  done();
});

gulp.task('clean:scripts', function (done) {
  del.sync(paths.dist + 'scripts/');
  done();
});

