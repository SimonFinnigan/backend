const db = require('../../db/connection')

const fetchArticle = (articleId) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: 'Article not found.',
        })
      }
      return rows
    })
}

module.exports = fetchArticle
