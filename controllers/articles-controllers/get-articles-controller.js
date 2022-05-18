const fetchArticles = require('../../models/articles-models/fetch-articles-model')

const getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query
  fetchArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send(articles)
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = getArticles
