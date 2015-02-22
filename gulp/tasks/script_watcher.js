var gulp = require('gulp');
var utils = require('gulp-util');
var watchify = require('watchify');

module.exports = function (bundler) {
  var watcher = watchify(bundler);
  watcher.on('update', function (files, args) {
    var compiledTemplates = _.any(files, function (file) {
      return file.search("build\/templates.js") >= 0
    });

    // do not rebundle on template.js changes
    if (!compiledTemplates) {
      bundle();
    }
  });

  var templatePath =
  gulp.src(templateConfigs.src + '*jst')
    .pipe(watch(templateConfigs.src + '*.jst', {}, function () {
      utils.log(utils.colors.red("KICKING OFF JST COMPILER"));
      JSTCompiler(bundle);
    }));
};

