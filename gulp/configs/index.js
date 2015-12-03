var packageJson = require('../../package.json');

module.exports = {
  announce: function (msg) {
    console.log('\n' + msg);
    console.log('==============================\n');
  },

  dependencies: Object.keys(packageJson.devDependencies),
};
