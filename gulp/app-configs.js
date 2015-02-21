var appDir = './app/'; // Relative to project directory
var build = './build/';
var paths = {
  scripts: appDir + 'scripts/',
  scriptsDest: build + 'scripts/',
  styles: appDir + 'styles/',
  stylesDest: build + 'styles/'
};

module.exports = {
  sass: {
    src: paths.styles + '/*.scss',
    dest: paths.stylesDest,
    settings: {}
  },
  bundles: [{
    entries: paths.scripts + 'test.js',
    dest: paths.scriptsDest,
    outputName: 'test.js'
  }]
};

