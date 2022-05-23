const db = require('../../db/connection')

const removeArticleComment = (commentId) => {
  return db
    .query(
      `
			DELETE FROM comments
			WHERE comment_id = $1;`,
      [commentId]
    )
    .then((deleteConf) => {
      const { rowCount } = deleteConf
      if (rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: 'Comment not found',
        })
      } else return
    })
}

module.exports = { removeArticleComment }
