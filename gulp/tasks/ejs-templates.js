var gulp = require('gulp');
var gutils = require('gulp-util');
var _ = require('underscore');
var paths = require('../configs/shim/path-builder');
var through = require('through2');
var fs = require('fs');

gulp.task('ejs-templates', function () {
  announce('BUIDLING MY TEMPLATES');
  return gulp.src(paths.scripts + 'views/templates/**/*.ejs')
    .pipe(listTemplates([]))
    .pipe(createTemplatesIndex())
    .pipe(gulp.dest(paths.scripts + 'views/templates'));
});

// private ==============================

function listTemplates(files, prefix) {
  return through.obj(function (file, enc, cb) {
    if (prefix) {
      gutils.log(`(${prefix}) ${file.relative}`);
    } else {
      prefix = '';
      gutils.log(`${file.relative}`);
    }

    files.push({
      name: prefix + file.relative.replace('\.ejs', ''),
      path: file.base + file.relative,
    });

    cb(null, files);
  });
}

function createTemplatesIndex() {
  return through.obj(function (files, enc, cb) {
    fs.readFile(paths.jsBase + 'jelly/gulp/configs/templates/template-list.js', function (err, buff) {
      if (err) throw (err);

      var listOfTemplates = _.template(buff.toString())({ files: files });

      cb(null, new gutils.File({
        contents: new Buffer(listOfTemplates),
        path: 'index.js',
      }));

    });
  });
}

function announce(msg) {
  gutils.log(gutils.colors.bold('==============================='));
  gutils.log(gutils.colors.bold(msg));
  gutils.log(gutils.colors.bold('==============================='));
}

