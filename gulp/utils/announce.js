var utils = require('gulp-util');

module.exports = function () {
  utils.log();
  utils.log(utils.colors.cyan.apply(utils.colors, arguments));
  utils.log();
};

