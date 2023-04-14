# express-edge

> Use Edge templating engine with Express

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fecrmnn%2Fexpress-edge%2Fbadge%3Fref%3Dmaster&style=flat-square&label=build)](https://github.com/ecrmnn/express-edge/actions)
[![npm version](https://img.shields.io/badge/Node.js-v14%2B-green?style=flat-square)](https://github.com/ecrmnn/express-edge)
[![npm version](https://img.shields.io/npm/v/express-edge.svg?style=flat-square)](http://badge.fury.io/js/express-edge)
[![npm downloads](https://img.shields.io/npm/dm/express-edge.svg?style=flat-square)](http://badge.fury.io/js/express-edge)
[![npm license](https://img.shields.io/npm/l/express-edge.svg?style=flat-square)](http://badge.fury.io/js/express-edge)
[![prs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![eslint](https://img.shields.io/badge/code_style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)

## Installation

```bash
npm install express-edge --save
```

## Usage

See the [Edge documentation](https://docs.adonisjs.com/guides/views/introduction) for how to structure your templates.

Requires Node.js 14+ from `express-edge@3`

```javascript
const express = require('express');
const app = express();
const engine = require('express-edge');

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views`);

// Configure view caching
app.enable('view cache');
// --- or ---
app.diable('view cache');

app.get('/', (req, res) => {
  res.render('users.index', { users });
});

app.listen(3000);
```

## License

MIT © [Daniel Eckermann](http://danieleckermann.com)
