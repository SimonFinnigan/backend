const fetchArticles = require('../../models/articles-models/fetch-articles-model')

const getArticles = (req, res, next) => {
  fetchArticles()
    .then((articles) => {
      res.status(200).send(articles)
    })
    .catch(next)
}

module.exports = getArticles
