var gulp = require('gulp');
var paths = require('../configs/shim/path-builder.js');

var htmls = function () {
  return gulp.src(`${paths.htmls}**/\*.html`)
   .pipe(gulp.dest(paths.dist));
};

gulp.task('htmls', htmls);

module.exports = htmls;

