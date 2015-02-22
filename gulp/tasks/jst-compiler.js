var gulp = require('gulp');
var announce = require('../utils/announce.js');
var engines = require('universal-jst');
var fs = require('fs');
var configs = require('../app-configs.js').templates;

var compileJST = function (callback) {
  announce('Compiling Templates');

  engines.underscore(configs.src, function (err, data) {
    fs.writeFileSync(configs.dest, data.join('\n'));
    callback(); // Tell gulp we're done with this task
  });
};

gulp.task('JST', compileJST);

module.exports = compileJST;

