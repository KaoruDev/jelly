#!/usr/bin/env node

var configs = require('./gulp/configs');
var exec = require('child_process').execSync;
var processOptions = { stdio: 'inherit' };

configs.announce('Installing Jelly!');

configs.announce('Installing Dependencies');
exec('npm install --save-dev ' + configs.dependencies.join(' '), processOptions);

configs.announce('Setting up Jelly environment');
console.log('Copying over gulpfile.js');
exec('cp ./jelly/gulp/configs/gulpfile-template.js ./gulpfile.js', processOptions);

console.log('Creating tasks/configs/path-builder.js');
exec('mkdir -p ./tasks/configs/', processOptions);
exec('cp ./jelly/gulp/configs/path-builder-template.js ./tasks/configs/path-builder.js', processOptions);

console.log('Creating webpack configs');
exec('mkdir -p ./tasks/configs/webpack', processOptions);
exec('cp ./jelly/gulp/configs/webpack-configs-template.js ./tasks/configs/webpack/configs.js', processOptions);

console.log('Creating scripts...');
exec('mkdir -p ./scripts', processOptions);
exec('touch ./scripts/index.js', processOptions);

console.log('Creating styles...');
exec('mkdir -p ./styles', processOptions);
exec('touch ./styles/main.scss', processOptions);

console.log('Creating htmls...');
exec('mkdir -p ./htmls', processOptions);
exec('touch ./htmls/index.html', processOptions);

console.log('Creating gitignore');
exec('cp ./jelly/gulp/configs/gitignore-template.txt ./.gitignore', processOptions);

configs.announce('May the Jelly be with you!');

