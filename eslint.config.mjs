import globals from 'globals';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier-standard'
  ),

  includeIgnoreFile(gitignorePath),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.amd,
        GLOBAL: false,
        it: false,
        expect: false,
        describe: false
      }
    },

    rules: {
      'prettier/prettier': ['error', prettierOptions],

      'import/no-webpack-loader-syntax': 0,
      curly: ['error', 'all'],
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-console': ['error', { allow: ['error'] }],
      'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['error', 250],
      'no-else-return': 'error',
      'max-params': ['error', 4],
      'no-shadow': 'error',
      complexity: ['error', 5],
      'no-empty': 'error',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'internal', 'parent', 'sibling', 'index']]
        }
      ]
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
    },

    ignores: [
      'build',
      'out',
      'node_modules',
      'stats.json',
      '.next',
      '.DS_Store',
      'npm-debug.log',
      '.idea',
      '**/coverage/**',
      '**/storybook-static/**',
      '**/server/**',
      'lighthouserc.js',
      'lingui.config.js',
      '__tests__',
      'internals/**/*.*',
      'coverage/**/*.*',
      'reports/**/*.*',
      'badges/**/*.*',
      'assets/**/*.*',
      '**/tests/**/*.test.js',
      'playwright.config.js',
      'babel.config.js',
      'app/translations/*.js',
      'app/**/stories/**/*.*'
    ]
  }
];
