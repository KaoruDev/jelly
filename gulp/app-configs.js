var appDir = './app/'; // Relative to project directory
var build = './build/';
var paths = {
  scripts: appDir + 'scripts/',
  scriptsDest: build + 'scripts/'
};

module.exports = {
  bundles: [{
    entries: paths.scripts + 'test.js',
    dest: paths.scriptsDest,
    outputName: 'test.js'
  }]
};

