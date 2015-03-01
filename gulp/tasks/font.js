var gulp = require('gulp');
var config = require('../app-configs.js').fonts;

gulp.task('fonts', function () {
  gulp.src(config.blobs).
    pipe(gulp.dest('./build/fonts/'));
});

