const {
  removeArticleComment,
} = require('../../models/comments-models/remove-article-comment-model')

const deleteArticleComment = (req, res, next) => {
  const { comment_id } = req.params

  removeArticleComment(comment_id)
    .then(() => {
      res.status(204).send()
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = deleteArticleComment
