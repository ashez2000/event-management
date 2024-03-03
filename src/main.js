import 'dotenv/config'

import http from 'node:http'
import app from './app.js'

const port = process.env.PORT || 3000

const main = () => {
  const server = http.createServer(app)

  server.listen(port, () => {
    console.log('Listening on port:', port)
  })
}

main()
