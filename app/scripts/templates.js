var path = './templates/';
var _ = require('lodash');

module.exports = function (fileName) {
  require(path + fileName);
};


