var fs = require('fs');
var _ = require('lodash');

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

var jsFiles = [
];

module.exports = {
  sass: {
    src: paths.styles + '/*.scss',
    dest: paths.stylesDest,
    settings: {
      includePaths: [
        //'tmp/vendor.scss' // uncomment to import vendor css files
      ]
    }
  },
  templates: {
    src: paths.templates,
    dest: 'tmp/templates.js'
  },
  bundles: _.map(jsFiles, function (file) {
    return {
      entries: paths.scripts + file,
      dest: paths.scriptsDest,
      outputName: file,
      ignore: './tmp/templates.js'
    };
  }),
  aws: {
    bucket: {
      key: aws.akid,
      secret: aws.sak,
      bucket: aws.bucket
    }
  },
  fonts: {
    blobs: [
      // List of font files
    ]
  },
  vendorCss: [
    // list of vendor css
  ]
};

