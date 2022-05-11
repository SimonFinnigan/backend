const db = require('../../db/connection')

const fetchArticleComments = (articleId) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1`, [articleId])
    .then(({ rows }) => {
      return rows
    })
}

module.exports = fetchArticleComments
