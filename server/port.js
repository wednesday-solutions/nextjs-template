const argv = require('./argv');

const isRunLocalHttps = process.env.RUN_LOCAL_HTTPS;

module.exports = parseInt(isRunLocalHttps ? '443' : argv.port || process.env.PORT || '3000', 10);
