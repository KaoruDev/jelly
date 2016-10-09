const gulp = require('gulp');
const browserSync = require('browser-sync');
const paths = require('../configs/shim/path-builder.js');
const htmlTask = require('./htmls');
const webpack = require('webpack');
const watch = require('gulp-watch');
const webpackConfigs = require('../configs/shim/webpack-configs.js');
const webpackDevMiddleware = require('webpack-dev-middleware');

gulp.task('serve', ['htmls'], () => {
  const bundler = webpack(webpackConfigs.dev);
  const server = browserSync.create();

  watch(htmlTask.HTML_GLOB, () => {
    htmlTask().on('end', () => {
      server.reload();
    });
  });

  server.init({
    open: false,
    server: {
      baseDir: `${paths.dist}/`,
      middleware: [
        webpackDevMiddleware(bundler, {
          noInfo: true,
          stats: { colors: true },
          publicPath: webpackConfigs.dev.output.publicPath,
        }),
      ],
    },

    files: [
      `${paths.styles}**/*.scss`,
      `${paths.scripts}/**/*.js`,
    ],
  });
});

