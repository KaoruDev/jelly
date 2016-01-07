// jscs:disable
// jshint ignore:start

var _ = require('underscore');

var templates = window.JST = _.extend(window.JST || {}, {
  <% _.each(files, function (file) { %>
    '<%- file.name %>': require('<%- file.path %>'),
  <% }) %>
});

module.exports = templates;

