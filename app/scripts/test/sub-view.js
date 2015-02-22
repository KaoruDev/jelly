var JST = require('templates');

module.exports = function () {
  console.log("SUB VIEW ONLINE");
  document.write(JST['jelly_welcome']());
};

