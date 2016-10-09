#!/usr/bin/env node

const configs = require('./gulp/configs');
const exec = require('child_process').execSync;
const processOptions = { stdio: 'inherit' };
const fs = require('fs');
const isFileNonExistent = function (filename, callback) {
  try {
    fs.accessSync(filename);
  } catch (e) {
    callback();
  }
};

configs.announce('Installing Jelly!');

isFileNonExistent('./package.json', () => {
  configs.announce('Installing Dependencies');
  exec(`npm init`, processOptions);
  exec(`npm install --save-dev ${configs.dependencies.join(' ')}`, processOptions);
});

configs.announce('Setting up Jelly environment');

isFileNonExistent('./gulpfile.js', () => {
  console.log('Copying over gulpfile.js');
  exec('cp ./jelly/gulp/configs/gulpfile-template.js ./gulpfile.js', processOptions);
});

isFileNonExistent('./tasks/configs/path-builder.js', () => {
  console.log('Creating tasks/configs/path-builder.js');
  exec('mkdir -p ./tasks/configs/', processOptions);
  exec('cp ./jelly/gulp/configs/path-builder-template.js ./tasks/configs/path-builder.js', processOptions);
});

isFileNonExistent('./tasks/configs/webpack/configs.js', () => {
  console.log('Creating webpack configs');
  exec('mkdir -p ./tasks/configs/webpack', processOptions);
  exec('cp ./jelly/gulp/configs/webpack-configs-template.js ./tasks/configs/webpack/configs.js', processOptions);
});

isFileNonExistent('./source/scripts/index.js', () => {
  console.log('Creating scripts...');
  exec('mkdir -p ./source/scripts', processOptions);
  exec('touch ./source/scripts/index.js', processOptions);
});

isFileNonExistent('./source/styles/main.scss', () => {
  console.log('Creating styles...');
  exec('mkdir -p ./source/styles', processOptions);
  exec('touch ./source/styles/main.scss', processOptions);
});

isFileNonExistent('./source/htmls/index.html', () => {
  console.log('Creating htmls...');
  exec('mkdir -p ./source/htmls', processOptions);
  exec('cp ./jelly/lib/htmls/index.html ./source/htmls/index.html', processOptions);
});

isFileNonExistent('.gitignore', () => {
  console.log('Creating gitignore');
  exec('cp ./jelly/gulp/configs/gitignore-template.txt ./.gitignore', processOptions);
});

configs.announce('May the Jelly be with you!');

