var fs = require('fs');

var aws = JSON.parse(fs.readFileSync('./.aws.json'));

var appDir = './app/'; // Relative to project directory
var build = './build/';
var paths = {
  scripts: appDir + 'scripts/',
  scriptsDest: build + 'scripts/',
  styles: appDir + 'styles/',
  stylesDest: build + 'styles/',
  templates: appDir + 'scripts/templates/'
};

module.exports = {
  sass: {
    src: paths.styles + '/*.scss',
    dest: paths.stylesDest,
    settings: {
      includePaths: ['bower_components/foundation/scss']
    }
  },
  templates: {
    src: paths.templates,
    dest: build + 'tmp/templates.js'
  },
  bundles: [{
    entries: paths.scripts + 'test.js',
    dest: paths.scriptsDest,
    outputName: 'test.js',
    ignore: build + 'scripts/templates.js'
  }],
  aws: {
    bucket: {
      key: aws.akid,
      secret: aws.sak,
      bucket: aws.bucket
    }
  }
};

