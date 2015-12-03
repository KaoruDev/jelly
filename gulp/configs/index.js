var packageJson = require('../../package.json');

module.exports = {
  announce: function (msg) {
    console.log('\n' + msg);
  },

  dependencies: Object.keys(packageJson.devDependencies),
};
