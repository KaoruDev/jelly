var _ = require('lodash');
var JST = require('templates');
var subView = require('./test/sub-view.js');
//var template = {
  //welcome: require('./templates/jelly_welcome.jst')
//};
////var templates = require('./templates.js');
//var subView = require('./test/sub-view.js');
document.write(JST['jelly_welcome']());
subView();

