const db = require('../db/connection')
const articles = require('../db/data/test-data/articles')

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

const updateArticle = (articleId, incVotes) => {
  return db
    .query(
      `UPDATE articles 
              SET votes = (votes + $1) 
              WHERE article_id = $2 RETURNING *;`,
      [incVotes, articleId]
    )
    .then(({ rows }) => {
      return rows[0]
    })
}

module.exports = { fetchArticles, fetchArticle, updateArticle }
