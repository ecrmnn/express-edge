const fs = require('fs');
const { Edge } = require('edge.js');

const engine = (req, res, next) => {
  /*
  |-------------------------------------------------------------------------------------------------
  | Override the app.render function so that we can use dot notation
  |-------------------------------------------------------------------------------------------------
  */

  const { render } = res;

  res.render = function _render(view, options, callback) {
    const self = this;

    render.call(self, view.replace(/\./gi, '/'), options, callback);
  };

  /*
  |-------------------------------------------------------------------------------------------------
  | Register the edge view engine
  |-------------------------------------------------------------------------------------------------
  */

  req.app.engine('edge', (filePath, options, callback) => {
    const cache = req.app.settings['view cache'] || false;
    req.app.settings['view cache'] = cache;

    const edge = new Edge({ cache });
    edge.mount('default', req.app.settings.views);
    const template = edge.getRenderer();

    fs.readFile(filePath, 'utf-8', (err, content) => {
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
