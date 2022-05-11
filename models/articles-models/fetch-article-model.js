const db = require('../../db/connection')

const fetchArticle = (article_id) => {
  return db
    .query(
      `SELECT a.*, COUNT(c.comment_id)::INT AS comment_count 
      FROM articles AS a 
      LEFT JOIN comments AS c 
      ON a.article_id = c.article_id 
      WHERE a.article_id = $1 
      GROUP BY a.article_id`,
      [article_id]
    )
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
