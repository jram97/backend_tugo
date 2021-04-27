import http from 'http'
import { env, mongo, port, ip, apiRoot, cors } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import express1 from 'express'
import path from 'path'
import api from './api'
import './services/firebase/firebase'

const app = express(apiRoot, api)
const server = http.createServer(app)

app.use(cors);
app.use('/static', express1.static(__dirname + path.join('/api/public/')));

if (mongo.uri) {
  mongoose.connect(mongo.uri)
}
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
