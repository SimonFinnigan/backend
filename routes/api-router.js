const apiRouter = require('express').Router()
const topicsRouter = require('./topics-router')
const articlesRouter = require('./articles-router')
const usersRouter = require('./users-router')
const endpointsRouter = require('./endpoints-router')

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/', endpointsRouter)

module.exports = apiRouter
