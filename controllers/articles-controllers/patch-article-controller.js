const updateArticle = require('../../models/articles-models/update-article-model')

const patchArticle = (req, res, next) => {
  const { article_id } = req.params
  const { inc_votes } = req.body

  updateArticle(article_id, inc_votes)
    .then((article) => {
      res.status(200).send(article)
    })
    .catch(next)
}

module.exports = patchArticle
