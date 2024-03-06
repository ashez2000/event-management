import { AppError } from '../utils/app-error.js'

export const errorHandler = (err, req, res, next) => {
  console.log(err)

  if (err.name === 'AppError') {
    return res.status(err.statusCode).json({
      message: err.statusCode === 500 ? 'Internal Server Error' : err.message,
    })
  }

  res.status(500).json({
    message: 'Internal Server Error',
  })
}

export const notFound = (req, res) => {
  throw new AppError('Route not found', 404)
}
