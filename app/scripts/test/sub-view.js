var jellyTemplate = require('../templates/jelly_welcome.jst');
module.exports = function () {
  console.log("SUB VIEW ONLINE");
  console.log(jellyTemplate());
};

