'use strict';

module.exports = {
  extends: 'airbnb-base',
  rules: {
    strict: [2, 'global'],
  },
  parserOptions: {
    sourceType: 'script',
  },
  env: {
    browser: true,
    node: true,
  },
};
