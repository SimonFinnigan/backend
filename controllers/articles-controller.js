const { fetchArticles, fetchArticle } = require('../models/articles-models')

const getArticles = (req, res, next) => {
  fetchArticles()
    .then((body) => {
      res.status(200).send(body)
    })
    .catch(next)
}

const getArticle = (req, res, next) => {
  fetchArticle(req.params.article_id)
    .then((body) => {
      res.status(200).send(body)
    })
    .catch(next)
}

module.exports = { getArticles, getArticle }
