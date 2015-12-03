var _ = require('underscore');
var args = require('minimist')(process.argv.slice(2));
var path = require('path');

var repoRoot = path.join(__dirname, '../../');
var base = {
  repoRoot: repoRoot,
  prodDist: repoRoot + 'prod_dist',
  base: repoRoot + 'front_end',
  lib: !!args.lib,
  tmp: repoRoot + 'tmp',
};

module.exports = new PathMap(base);

// private ==============================

function PathMap(base) {
  var targetRoot = args.lib ? args.lib : base.base;

  _.extend(this, base, {
    root: targetRoot,
    scripts: `${targetRoot}scripts/`,
    styles: `${targetRoot}styles/`,
    specs: `${targetRoot}specs/`,
    images: `${targetRoot}images/`,
    dist: `${targetRoot}dist/`,
  });
}

