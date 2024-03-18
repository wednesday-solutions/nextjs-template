const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));
module.exports = {
  env: {
    browser: true,
    es6: true,
    es2021: true,
    'jest/globals': true
  },
  plugins: ['jest', 'immutable', 'prettier'],
  extends: ['eslint:recommended', 'prettier', 'plugin:import/recommended', 'next'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'import/no-webpack-loader-syntax': 0,
    'react/display-name': 0,
    'react/react-in-jsx-scope': 'off',
    curly: ['error', 'all'],
    'no-console': ['error', { allow: ['error'] }],
    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
    'max-lines-per-function': ['error', 250],
    'no-else-return': 'error',
    'max-params': ['error', 3],
    'no-shadow': 'error',
    complexity: ['error', 5],
    'no-empty': 'error',
    'import/order': ['error', { groups: [['builtin', 'external', 'internal', 'parent', 'sibling', 'index']] }],
    'immutable/no-this': 2,
    'eslint-comments/no-use': 0
  },
  globals: {
    GLOBAL: false,
    it: false,
    expect: false,
    describe: false
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@app', './app'],
          ['@components', './app/components'],
          ['@themes', './app/themes'],
          ['@utils', './app/utils'],
          ['@images', './app/images'],
          ['@store', './app/store'],
          ['@services', './app/services']
        ],
        extensions: ['.ts', '.js', '.jsx', '.json']
      }
    }
  }
};
