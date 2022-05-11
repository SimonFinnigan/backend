const insertArticleComment = require('../../models/comments-models/insert-article-comment-model')

const postArticleComment = (req, res, next) => {
  const { article_id } = req.params
  const userComment = req.body
  insertArticleComment(article_id, userComment)
    .then((comment) => {
      res.status(201).send({ comment })
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = postArticleComment
