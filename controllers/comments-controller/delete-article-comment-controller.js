const {
  removeArticleComment,
  checkCommentExists,
} = require('../../models/comments-models/remove-article-comment-model')

const deleteArticleComment = (req, res, next) => {
  const { comment_id } = req.params

  checkCommentExists(comment_id).catch((err) => {
    next(err)
  })
  removeArticleComment(comment_id)
    .then(() => {
      res.status(204).send()
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = deleteArticleComment
