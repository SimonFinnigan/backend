const articlesRouter = require('express').Router()
const getArticle = require('../controllers/articles-controllers/get-article-controller')
const getArticles = require('../controllers/articles-controllers/get-articles-controller')
const getArticleComments = require('../controllers/comments-controller/get-article-comments-controller')
const patchArticle = require('../controllers/articles-controllers/patch-article-controller')
const postArticleComment = require('../controllers/comments-controller/post-article-comment-controller')
const deleteArticleComment = require('../controllers/comments-controller/delete-article-comment-controller')

articlesRouter.route('/').get(getArticles)

articlesRouter.route('/:article_id').get(getArticle).patch(patchArticle)
articlesRouter
  .route('/:article_id/comments')
  .get(getArticleComments)
  .post(postArticleComment)

articlesRouter
  .route('/:article_id/comments/:comment_id')
  .delete(deleteArticleComment)

module.exports = articlesRouter
