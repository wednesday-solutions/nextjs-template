const path = require('path');

module.exports = {
  process(src, filename, config, options) {
    let alias;
    try {
      alias = 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
    } catch (error) {
      alias = 'Image';
    }
    return alias;
  }
};
