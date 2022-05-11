const fetchArticleComments = require('../../models/articles-models/fetch-article-comments-model')

const getArticleComments = (req, res, next) => {
  const { article_id } = req.params

  fetchArticleComments(article_id).then((articleComments) => {
    res.status(200).send(articleComments)
  })
}

module.exports = getArticleComments
