#!/usr/bin/env node

var configs = require('./gulp/configs');
var exec = require('child_process').execSync;
var processOptions = { stdio: 'inherit' };

configs.announce('Installing Jelly!');
configs.announce('Copying over gulpfile');
exec('cp ./jelly/gulp/configs/gulpfile-template.js ./gulpfile.js', processOptions);

configs.announce('Installing Dependencies');
exec('npm install --save-dev' + configs.dependencies.join(' '), processOptions);

configs.announce('May the Jelly be with you!');

