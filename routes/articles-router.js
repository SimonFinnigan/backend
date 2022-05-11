const articlesRouter = require('express').Router()
const getArticle = require('../controllers/articles-controllers/get-article-controller')
const getArticles = require('../controllers/articles-controllers/get-articles-controller')
const patchArticle = require('../controllers/articles-controllers/patch-article-controller')
const getArticleComments = require('../controllers/articles-controllers/get-article-comments-controller')

articlesRouter.route('/').get(getArticles)

articlesRouter.route('/:article_id').get(getArticle).patch(patchArticle)
articlesRouter.route('/:article_id/comments').get(getArticleComments)


module.exports = articlesRouter
