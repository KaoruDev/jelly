var path = require('path');

var repoRoot = path.join(__dirname, '../../').replace(/\/$/, '');

module.exports = {
  repoRoot: repoRoot,
  tmp: `${repoRoot}/tmp`,
  dist: `${repoRoot}/dist`,
  images: `${repoRoot}/source/images`,
  htmls: `${repoRoot}/source/htmls`,
  root: repoRoot,
  scripts: `${repoRoot}/source/scripts`,
  styles: `${repoRoot}/source/styles`,
};
