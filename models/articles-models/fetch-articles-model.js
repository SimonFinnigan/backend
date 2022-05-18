const db = require('../../db/connection')

const fetchArticles = (sort_by = 'created_at', order = 'desc', topic) => {
  if (
    ![
      'article_id',
      'title',
      'topic',
      'author',
      'created_at',
      'votes',
      'comment_count',
    ].includes(sort_by)
  ) {
    return Promise.reject({ status: 400, msg: 'Invalid sort query' })
  }

  if (!['asc', 'desc'].includes(order)) {
    return Promise.reject({ status: 400, msg: 'Invalid order query' })
  }

  if (
    !['cats', 'mitch', 'coding', 'football', 'cooking', undefined].includes(
      topic
    )
  ) {
    return Promise.reject({ status: 400, msg: 'Invalid topic query' })
  }
 
  const topicSort = topic === undefined ? '' : `WHERE topic = '${topic}'`

  return db
    .query(
      `SELECT articles.*, 
      COUNT(comments.article_id)::INT AS comment_count 
      FROM articles
      LEFT JOIN comments 
      ON articles.article_id = comments.article_id   
      ${topicSort} GROUP BY articles.article_id 
      ORDER BY ${sort_by} ${order};`
    )
    .then(({ rows: articles }) => {
      return articles
    })
}

module.exports = fetchArticles
