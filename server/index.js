const { createServer } = require('http')
const { URL } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

console.log(process.env.GITHUB_URL, 'GITHUB_NEXT')

app.prepare().then(() => {
  createServer((req, res) => {
    // 'url.parse' was deprecated since v11.0.0.
    const parsedUrl = new URL(req.url, process.env.GITHUB_URL)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
