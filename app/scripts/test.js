var _ = require('lodash');
var template = {
  welcome: require('./templates/jelly_welcome.jst')
};
//var templates = require('./templates.js');
var subView = require('./test/sub-view.js');
document.write(template.welcome());
subView();

