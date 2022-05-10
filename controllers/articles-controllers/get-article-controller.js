const fetchArticle = require('../../models/articles-models/fetch-article-model')

const getArticle = (req, res, next) => {
  const { article_id } = req.params

  fetchArticle(article_id)
    .then((body) => {
      res.status(200).send(body)
    })
    .catch(next)
}

module.exports = getArticle
