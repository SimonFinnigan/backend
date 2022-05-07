const app = require('../app')
const request = require('supertest')
const connection = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')

beforeEach(() => seed(testData))
afterAll(() => connection.end())

describe('ALL', () => {
  test('status: 404', () => {
    return request(app)
      .get('/api/topicz')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Not Found')
      })
  })
})

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
})
