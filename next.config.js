const path = require('path');

module.exports = {
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

  // more options in the optional jshint object
  jshint: {
    camelcase: true,
    emitErrors: false,
    failOnHint: false,

    // custom reporter function
    reporter: function (errors) {}
  }
};
