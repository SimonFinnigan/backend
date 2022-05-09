const db = require('../db/connection')

const fetchArticles = () => {
  return db.query(`SELECT * FROM articles`).then(({ rows }) => {
    return rows
  })
}

const fetchArticle = (articleId) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
    .then(({ rows }) => {
      return rows
    })
}

module.exports = { fetchArticles, fetchArticle }
