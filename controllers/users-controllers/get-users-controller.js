const fetchUsers = require('../../models/users-models/fetch-users-model')

const getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send(users)
    })
    .catch(next)
}

module.exports = getUsers
