import express from 'express'
import morgan from 'morgan'

import authRoutes from './routes/auth.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!')
})

app.use('/api/auth', authRoutes)

export default app
