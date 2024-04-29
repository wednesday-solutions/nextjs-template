const withImages = require('next-images');

module.exports = withImages({
  assetPrefix: process.env.BASE_PATH || '',
  basePath: process.env.BASE_PATH || '',
  trailingSlash: true
});
