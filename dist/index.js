'use strict';

var fs = require('fs');
var edge = require('edge.js');

module.exports = function (req, res, next) {
  /*
  |-------------------------------------------------------------------------------------------------
  | Override the app.render function so that we can use dot notation
  |-------------------------------------------------------------------------------------------------
  */

  var render = res.render;

  res.render = function _render(view, options, callback) {
    var self = this;

    render.call(self, view.replace('.', '/'), options, callback);
  };

  /*
  |-------------------------------------------------------------------------------------------------
  | Register the edge view engine
  |-------------------------------------------------------------------------------------------------
  */

  req.app.engine('edge', function (filePath, options, callback) {
    edge.registerViews(options.settings.views);

    fs.readFile(filePath, 'utf-8', function (err, content) {
      if (err) {
        return callback(err);
      }

      return callback(null, edge.renderString(content, options));
    });
  });

  /*
  |-------------------------------------------------------------------------------------------------
  | Set the app view engine
  |-------------------------------------------------------------------------------------------------
  */

  req.app.set('view engine', 'edge');

  next();
};