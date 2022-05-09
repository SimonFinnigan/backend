const articlesRouter = require('express').Router()
const {
  getArticles,
  getArticle,
} = require('../controllers/articles-controller')

articlesRouter.route('/').get(getArticles)

articlesRouter.route('/:article_id').get(getArticle)

module.exports = articlesRouter
