const usersRouter = require('express').Router()
const getUsers = require('../controllers/users-controllers/get-users-controller')

usersRouter.route('/').get(getUsers)

module.exports = usersRouter
