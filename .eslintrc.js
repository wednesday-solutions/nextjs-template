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
  extends: ['eslint:recommended', 'prettier', 'plugin:import/recommended', 'next'],
  plugins: ['prettier', 'jest'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'import/no-webpack-loader-syntax': 0,
    'react/display-name': 0,
    'react/react-in-jsx-scope': 'off',
    curly: ['error', 'all'],
    'no-console': ['error', { allow: ['error'] }]
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
