var gutils = require('gulp-util');
var colors = gutils.colors;

module.exports = {
  announce: function () {
    gutils.log();
    gutils.log(colors.cyan.apply(colors, arguments));
    gutils.log();
  },

  handleError: require('./handle-error'),
};
