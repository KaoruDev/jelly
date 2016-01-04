var gulp = require('gulp');
var utils = require('../utils');
var paths = require('../configs/shim/path-builder.js');

gulp.task('html', function (done) {
  utils.doesDirExist(`${paths.htmls}`).then( function () {
    done();
  }).catch(function (err) {
    utils.warn(`Could not find htmls directory: ${err}`);
    done();
  });
});

