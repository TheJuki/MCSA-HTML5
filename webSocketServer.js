const fastify = require('fastify')()
require('dotenv').config()

function handle (conn) {
  conn.pipe(conn) // creates an echo server
}

fastify.register(require('fastify-websocket'), {
  handle,
  options: { maxPayload: 1048576 }
})

fastify.get('/', { websocket: true }, (connection, req) => {
  connection.socket.on('message', message => {
    let capitalString = ''
    for (c in message) {
      capitalString += message[c].toUpperCase()
    }
    connection.socket.send(capitalString)
  })
  connection.socket.on('error', err => {
    fastify.log.error(err)
  })
})

const port = process.env.WSS_PORT || 3000

fastify.listen(3000, err => {
  if (err) {
    fastify.log.error(err)
  }
  console.log(`WSS server started at ws://localhost:${port}`)
})
