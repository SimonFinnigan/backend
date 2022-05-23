const app = require('../app')
const request = require('supertest')
const connection = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')
const sorted = require('jest-sorted')

beforeEach(() => seed(testData))
afterAll(() => connection.end())

describe('GET - /api/topics', () => {
  test('status: 200 - should return an array of 3 topic objects with slug and description properties', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(3)
        body.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          )
        })
      })
  })

  test('status: 404', () => {
    return request(app)
      .get('/api/topicz')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Not Found')
      })
  })
})

describe('GET - /api/users', () => {
  test('status: 200 - responds with an array of objects, each object should have the "username" property', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(4)
        body.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({ username: expect.any(String) })
          )
        })
      })
  })

  test('status: 404', () => {
    return request(app)
      .get('/api/userz')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Not Found')
      })
  })
})

describe('GET - /api/articles', () => {
  test('status: 200 - an articles array of article objects, each of which should have the following properties: author, table, title, article_id, topic, created_at, votes, comment_count', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(12)
        body.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            })
          )
        })
      })
  })
  test('status: 404', () => {
    return request(app)
      .get('/api/articlez')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Not Found')
      })
  })
})

describe('GET - /api/articles (query)', () => {
  test('status 200: returns an array of article objects in descending date order by default', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body: articles }) => {
        expect(articles).toBeSortedBy('created_at', {
          descending: true,
        })
      })
  })
  test('status 200: returns an array of article objects in ascending date order when requested in query params', () => {
    return request(app)
      .get('/api/articles?order=asc')
      .expect(200)
      .then(({ body: articles }) => {
        expect(articles).toBeSortedBy('created_at', {
          ascending: true,
        })
      })
  })
  test('status 200: returns an array of article objects srted by author in descnding order when requested in query params', () => {
    return request(app)
      .get('/api/articles?sort_by=author')
      .expect(200)
      .then(({ body: articles }) => {
        expect(articles).toBeSortedBy('author', {
          descending: true,
        })
      })
  })
  test('status 200: returns an array of article objects filtered by topics when requested in query params', () => {
    return request(app)
      .get('/api/articles?topic=mitch')
      .expect(200)
      .then(({ body: articles }) => {
        expect(articles).toHaveLength(11)
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              topic: 'mitch',
            })
          )
        })
      })
  })
  test('status 200: returns an array of article objects filtered by topics and sorted by author in ascending order when requested in query params', () => {
    return request(app)
      .get('/api/articles?sort_by=author&&order=asc&&topic=mitch')
      .expect(200)
      .then(({ body: articles }) => {
        expect(articles).toHaveLength(11)
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              topic: 'mitch',
            })
          )
        })
        expect(articles).toBeSortedBy('author', {
          ascending: true,
        })
      })
  })
})

describe('ERRORS  /api/articles (queries)', () => {
  test('status 400: returns bad req id sort_query is not valid', () => {
    return request(app)
      .get('/api/articles?sort_by=snacks')
      .expect(400)
      .then(({ body: message }) => {
        expect(message.msg).toBe('Invalid sort query')
      })
  })
  test('status 400: returns bad req if order query is not valid', () => {
    return request(app)
      .get('/api/articles?order=blankets')
      .expect(400)
      .then(({ body: message }) => {
        expect(message.msg).toBe('Invalid order query')
      })
  })
  test('status 400: returns bad req id topic query is not valid', () => {
    return request(app)
      .get('/api/articles?topic=pups')
      .expect(400)
      .then(({ body: message }) => {
        expect(message.msg).toBe('Invalid topic query')
      })
  })
})

describe('GET - /api/articles/:article_id', () => {
  test('status: 200 - a single article array of article objects, each of which should have the following properties: author, table, title, article_id, topic, created_at, votes, comment_count', () => {
    const article_id = 1

    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(1)
        body.forEach((article) => {
          expect(article.comment_count).toBe(11)
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          )
        })
      })
  })

  test('status: 404', () => {
    return request(app)
      .get(`/api/articles/111`)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Article not found.')
      })
  })

  test('status: 400', () => {
    return request(app)
      .get('/api/articles/asd')
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Invalid input')
      })
  })
})

describe('PATCH - /api/articles/:article_id', () => {
  test('status: 200 - returns an update article when entered with an object of inc_votes: newVote', () => {
    const article_id = 1
    const inc_votes = { inc_votes: 1 }

    return request(app)
      .patch(`/api/articles/${article_id}`)
      .expect(200)
      .send(inc_votes)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: expect.any(String),
            votes: 101,
          })
        )
      })
  })

  test(`status: 404 - returns a path not found message if article id doesn't exist`, () => {
    const article_id = 1

    return request(app)
      .patch(`/api/articles/${article_id}s`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid input')
      })
  })
})

describe('GET - /api/articles/:article_id/comments', () => {
  test('status: 200 - should return an article response object which should also now include: comment_id, votes, created_at, username, body', () => {
    const article_id = 1

    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .expect(200)
      .then(({ body }) => {
        // console.log(body)
        expect(body).toHaveLength(11)
        body.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              body: expect.any(String),
              article_id: article_id,
              author: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
            })
          )
        })
      })
  })

  test('status: 404', () => {
    const article_id = 1

    return request(app)
      .get(`/api/articles/${article_id}/commentz`)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Not Found')
      })
  })
})

describe('POST - /api/articles/:article_id/comments', () => {
  test('status: 201 - should accept a request body with username and body properties and responds with the posted comment', () => {
    const article_id = 1
    const userComment = {
      username: 'lurker',
      body: 'Hello!',
    }

    return request(app)
      .post(`/api/articles/${article_id}/comments`)
      .send(userComment)
      .expect(201)
      .then(({ body: { comment } }) => {
        expect(comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            body: userComment.body,
            article_id: article_id,
            author: userComment.username,
            votes: expect.any(Number),
            created_at: expect.any(String),
          })
        )
      })
  })

  test('status: 400 - should return a message and a status 400 when an invalid article_id is provided', () => {
    const newComment = {
      username: 'lurker',
      body: 'Hello',
    }

    return request(app)
      .post('/api/articles/dog/comments')
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe('Invalid input')
      })
  })
})

describe('DELETE/api/comments/:comment_id', () => {
  test('status 204: returns no content and deletes the comment by comment id', () => {
    const article_id = 1
    const comment_id = 18

    return request(app)
      .delete(`/api/articles/${article_id}/comments/${comment_id}`)
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({})
      })
  })
})
describe('ERRORS/api/comments/:comment_id', () => {
  test('status 404: returns a not found error if a valid comment id is given but does not exist', () => {
    const article_id = 1
    const comment_id = 101
    return request(app)
      .delete(`/api/articles/${article_id}/comments/${comment_id}`)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Comment not found')
      })
  })
})
