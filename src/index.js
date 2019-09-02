'use strict';

const fs = require('fs');
const edge = require('edge.js');

const config = ({ cache } = { cache: false }) => {
  edge.configure({
    cache,
  });
};

const engine = (req, res, next) => {
  /*
  |-------------------------------------------------------------------------------------------------
  | Override the app.render function so that we can use dot notation
  |-------------------------------------------------------------------------------------------------
  */

  const render = res.render;

  res.render = function _render(view, options, callback) {
    const self = this;

    render.call(self, view.replace('.', '/'), options, callback);
  };

  /*
  |-------------------------------------------------------------------------------------------------
  | Register the edge view engine
  |-------------------------------------------------------------------------------------------------
  */

  req.app.engine('edge', (filePath, options, callback) => {
    edge.registerViews(options.settings.views);

    fs.readFile(filePath, 'utf-8', (err, content) => {
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

module.exports = { config, engine };
