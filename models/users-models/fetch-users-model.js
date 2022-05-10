const db = require('../../db/connection')

const fetchUsers = () => {
  return db.query(`SELECT USERNAME FROM USERS`).then(({ rows }) => {
    return rows
  })
}

module.exports = fetchUsers
