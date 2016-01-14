var gutils = require('gulp-util');
var colors = gutils.colors;
var fs = require('fs');
var exec = require('child_process').exec;

module.exports = {
  announce: function () {
    gutils.log();
    gutils.log(`[${colors.blue('JELLY')}] ${colors.cyan.apply(colors, arguments)}`);
    gutils.log();
  },

  warn: function () {
    gutils.log(`[${colors.blue('JELLY')}] ${colors.yellow.apply(colors, arguments)}`);
  },

  error: function () {
    gutils.log();
    gutils.log(`[${colors.blue('JELLY')}] ${colors.red.apply(colors, arguments)}`);
    gutils.log();
  },

  handleError: require('./handle-error'),

  doesDirExist: function (name) {
    return new Promise(function (resolve, reject) {
      fs.readdir(name, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },

  checkIfOnMaster: function (callback, throwErr) {
    exec('git rev-parse --abbrev-ref HEAD', function (err, stdout) {
      if (stdout.toString().match(/^master\n$/)) {
        callback();
      } else if (throwErr) {
        console.log(gutils.colors.red('WARNING: unable to deploy from ' + stdout.toString() + '. Please checkout master'));
        throw('Please checkout master before deploying to production');
      }
    });
  },
};
