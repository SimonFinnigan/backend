const db = require('../db/connection')

const fetchArticles = () => {
  return db.query(`SELECT * FROM articles`).then(({ rows }) => {
    return rows
  })
}

module.exports = fetchArticles
