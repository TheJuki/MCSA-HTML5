const fs = require('fs')
const path = require('path')
const fastify = require('fastify')({
  http2: true,
  https: {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.cert')
  }
})
const helmet = require('fastify-helmet')
const serveStatic = require('serve-static')
const resolve = file => path.resolve(__dirname, file)
require('dotenv').config()

fastify.register(require('fastify-compress'), { threshold: 1024 })

fastify.use(serveStatic(resolve('./dist'), { maxAge: 0 }))

fastify.register(
  helmet,
  {
    hidePoweredBy: { setTo: '' },
    referrerPolicy: { policy: 'same-origin' },
    hsts: { maxAge: 31536000 },
    frameguard: { action: 'deny' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        frameAncestors: ["'none'"],
        baseUri: ["'none'"],
        objectSrc: ["'self'"],
        formAction: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'cloud.tinymce.com', 'use.fontawesome.com'],
        fontSrc: ["'self'", 'fonts.gstatic.com', 'cloud.tinymce.com', 'use.fontawesome.com'],
        imgSrc: ["'self'", 'data:', 'sp.tinymce.com'],
        sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin'],
        scriptSrc: ["'self'", 'cloud.tinymce.com'],
        connectSrc: ["'self'", 'cloud.tinymce.com', process.env.VUE_APP_API_URL],
        upgradeInsecureRequests: true,
        manifestSrc: ["'self'"]
      }
    }
  }
)

fastify.get('*', function (request, reply) {
  const stream = fs.createReadStream('./dist/index.html')
  reply.type('text/html').send(stream)
})

const port = process.env.PORT || 3443

fastify.listen(port, err => {
  if (err) throw err
  console.log(`server started at https://localhost:${port}`)
})