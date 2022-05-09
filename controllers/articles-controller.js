const fetchArticles = require('../models/articles-models')

const getArticles = (req, res, next) => {
  fetchArticles()
    .then((body) => {
      res.status(200).send(body)
    })
    .catch(next)
}

module.exports = getArticles
