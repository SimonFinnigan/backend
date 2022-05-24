const express = require('express')
const {
  handle404Errors,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  handleInvalidInputErrors,
} = require('./errors/errors')
const cors = require('cors')
const app = express()
const apiRouter = require('./routes/api-router')

app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)
app.use(handleInvalidInputErrors)

app.all('/*', handle404Errors)

module.exports = app
