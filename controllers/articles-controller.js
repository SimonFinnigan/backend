const {
  fetchArticles,
  fetchArticle,
  updateArticle,
} = require('../models/articles-models')

const getArticles = (req, res, next) => {
  fetchArticles()
    .then((articles) => {
      res.status(200).send(articles)
    })
    .catch(next)
}

const getArticle = (req, res, next) => {
  const { article_id } = req.params
  fetchArticle(article_id)
    .then((body) => {
      res.status(200).send(body)
    })
    .catch(next)
}

const patchArticle = (req, res, next) => {
  const { article_id } = req.params
  const { inc_votes } = req.body
  updateArticle(article_id, inc_votes)
    .then((article) => {
      res.status(200).send(article)
    })
    .catch(next)
}

module.exports = { getArticles, getArticle, patchArticle }
