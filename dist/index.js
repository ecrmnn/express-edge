'use strict';

var fs = require('fs');

var _require = require('edge.js'),
    Edge = _require.Edge;

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
    var cache = req.app.settings['view cache'] || false;
    req.app.settings['view cache'] = cache;

    var edge = new Edge({ cache: cache });
    edge.mount('default', req.app.settings.views);
    var template = edge.getRenderer();

    fs.readFile(filePath, 'utf-8', function (err, content) {
      if (err) {
        return callback(err);
      }

      return callback(null, template.renderRawSync(content, options));
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

module.exports = engine;