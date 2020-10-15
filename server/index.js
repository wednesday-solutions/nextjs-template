const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const isRunLocalHttps = process.env.RUN_LOCAL_HTTPS;
const argv = require('./argv');

const port = require('./port');

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

if (isRunLocalHttps) {
  const https = require('https');
  const fs = require('fs');
  const path = require('path');
  var certOptions = {
    key: fs.readFileSync(path.resolve('./server/server.key')),
    cert: fs.readFileSync(path.resolve('./server/server.crt'))
  };
  app.prepare().then(() => {
    https
      .createServer(certOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      })
      .listen(port, host, async (err) => {
        if (err) {
          return logger.error(err.message);
        }
      });
  });
} else {
  app.prepare().then(() => {
    https
      .createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;
      })
      .listen(port, host, async (err) => {
        if (err) {
          return logger.error(err.message);
        }
      });
  });
}
