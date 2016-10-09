var gulp = require('gulp');
var paths = require('../configs/shim/path-builder.js');

const HTML_GLOB = `${paths.htmls}/**/*.html`;

var htmls = function () {
  return gulp.src(HTML_GLOB)
    .pipe(gulp.dest(paths.dist));
};

htmls.HTML_GLOB = HTML_GLOB;

gulp.task('htmls', htmls);

module.exports = htmls;
