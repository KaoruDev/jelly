var gutils = require('gulp-util');
var colors = gutils.colors;
var fs = require('fs');

module.exports = {
  announce: function () {
    gutils.log();
    gutils.log(colors.cyan.apply(colors, arguments));
    gutils.log();
  },

  warn: function () {
    gutils.log(colors.yellow.apply(colors, arguments));
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
};
