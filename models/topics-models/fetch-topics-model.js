const db = require('../../db/connection')

const fetchTopics = (req, res) => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows
  })
}

module.exports = fetchTopics
