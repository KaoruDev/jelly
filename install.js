#!/usr/bin/env node

var configs = require('./gulp/configs');
var exec = require('child_process').execSync;
var processOptions = { stdio: 'inherit' };

configs.announce('Installing Jelly!');

console.log('Copying over gulpfile.js');
exec('cp ./jelly/gulp/configs/gulpfile-template.js ./gulpfile.js', processOptions);

console.log('Creating tasks/configs/path-builder.js');
exec('mkdir -p ./tasks/configs/', processOptions);
exec('cp ./jelly/gulp/configs/path-builder-template.js ./tasks/configs/path-builder.js', processOptions);

configs.announce('Installing Dependencies');
exec('npm install --save-dev' + configs.dependencies.join(' '), processOptions);

configs.announce('May the Jelly be with you!');

