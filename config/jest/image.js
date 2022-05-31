const path = require('path');

module.exports = {
  process(_src, filename) {
    let alias;
    try {
      alias = 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
    } catch (error) {
      alias = 'Image';
    }
    return alias;
  }
};
