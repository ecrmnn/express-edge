# express-edge
> Use Edge templating engine with Express

[![travis](https://img.shields.io/travis/ecrmnn/express-edge/master.svg?style=flat-square)](https://travis-ci.org/ecrmnn/express-edge/builds)
[![npm version](https://img.shields.io/npm/v/express-edge.svg?style=flat-square)](http://badge.fury.io/js/express-edge)
[![npm downloads](https://img.shields.io/npm/dm/express-edge.svg?style=flat-square)](http://badge.fury.io/js/express-edge)
[![npm license](https://img.shields.io/npm/l/express-edge.svg?style=flat-square)](http://badge.fury.io/js/express-edge)
[![prs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![eslint](https://img.shields.io/badge/code_style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)

### Installation
```bash
npm install express-edge --save
```

### Usage
See the [Edge documentation](http://edge.adonisjs.com/) for how to structure your templates.


```javascript
const express = require('express');
const app = express();

// Automatically sets view engine and adds dot notation to app.render
app.use(require('express-edge'));
app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {
  res.render('users.index', { users: [...] });
});

app.listen(3000);
```

### License
MIT © [Daniel Eckermann](http://danieleckermann.com)
