'use strict';

var fs = require('fs');
var edge = require('edge.js');

var config = function config() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { cache: false },
      cache = _ref.cache;

  edge.configure({
    cache: cache
  });
};

var engine = function engine(req, res, next) {
  /*
  |-------------------------------------------------------------------------------------------------
  | Override the app.render function so that we can use dot notation
  |-------------------------------------------------------------------------------------------------
  */

  var render = res.render;

  res.render = function _render(view, options, callback) {
    var self = this;

    render.call(self, view.replace(/\./gi, '/'), options, callback);
  };

  /*
  |-------------------------------------------------------------------------------------------------
  | Register the edge view engine
  |-------------------------------------------------------------------------------------------------
  */

  req.app.engine('edge', function (filePath, options, callback) {
    edge.registerViews(req.app.settings.views);

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

module.exports = { config: config, engine: engine };