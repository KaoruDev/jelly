var gulp = require('gulp');
var colors = require('gulp-util').colors;
var aws = require('gulp-awspublish');
var paths = require('../configs/shim/path-builder');
var fs = require('fs');
var rename = require('gulp-rename');
var utils = require('../utils');
var disabled = false;
var warnings = [];

try {
  var configs = JSON.parse(fs.readFileSync(paths.repoRoot + '.aws.json'));
}

catch (e) {
  warnings.push(colors.red('WARNING: No aws.js file found, deployer disabled!'));
  disabled = true;
}

var dependencies = [
  'webpack:prod',
  'sass:prod',
  'fonts',
  'htmls',
];

gulp.task('deploy:prod', dependencies, function () {
  logWarnings();
  if (disabled) return;

  utils.checkIfOnMaster(function () {
    var publisher = aws.create(configs);

  }, true);
});

gulp.task('deploy:test', dependencies, function () {
  logWarnings();
  if (disabled) return;

  var publisher = aws.create(configs);
  var stream = gulp.src(paths.dist + '**/*')
    .pipe(rename(function (path) {
      path.dirname = 'test/' + path.dirname;
    }));

  return publishStream(publisher, stream);
});

// private ==============================

function logWarnings() {
  warnings.forEach(function (warning) {
    console.log(warning);
  });
}

function publishStream(publisher, stream, cache) {
  stream = stream
    .pipe(aws.gzip())
    .pipe(publisher.publish({}));

  if (cache) {
    stream = stream.pipe(publisher.cache());
  }

  return stream.pipe(aws.reporter());
}

