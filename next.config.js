const path = require('path');
const withImages = require('next-images');

const withTM = require('next-transpile-modules')([
  '@formatjs/intl-relativetimeformat',
  '@formatjs/intl-utils',
  'react-intl'
]);
const constructAlias = (config) => {
  return {
    '@app': path.resolve(__dirname, './app'),
    '@components': path.resolve(__dirname, './app/components'),
    '@themes': path.resolve(__dirname, './app/themes'),
    '@utils': path.resolve(__dirname, './app/utils'),
    '@images': path.resolve(__dirname, './app/images'),
    '@store': path.resolve(__dirname, './app/store'),
    '@services': path.resolve(__dirname, './app/services'),
    ...config.resolve.alias
  };
};

module.exports = withTM(
  withImages({
    entry: {
      app: './index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/, // include .js files
          enforce: 'pre', // preload the jshint loader
          exclude: /node_modules/, // exclude any and all files in the node_modules folder
          use: [
            {
              loader: 'jshint-loader'
            }
          ]
        }
      ]
    },
    jshint: {
      camelcase: true,
      emitErrors: false,
      failOnHint: false,
      reporter: function (errors) {}
    },
    assetPrefix: process.env.BASE_PATH || '',
    basePath: process.env.BASE_PATH || '',
    trailingSlash: true,
    webpack(config, options) {
      config.resolve.alias = constructAlias(config);
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();

        if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
          entries['main.js'].unshift('./polyfills.js');
        }

        return entries;
      };
      return config;
    }
  })
);
