var appDir = './app/'; // Relative to project directory
var paths = {
  scripts: appDir + 'scripts/',
  build: './build/'
};

module.exports = {
  bundles: [{
    entries: paths.scripts + 'test.js',
    dest: paths.build,
    outputName: 'test.js'
  }]
};

