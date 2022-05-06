const app = require('../app')
const request = require('supertest')
const connection = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')

beforeEach(() => seed(testData))
afterAll(() => connection.end())

describe('TOPICS', () => {
  describe('GET /topics', () => {
    test('status: 200 - should respond with an array of objects, each of which should have the properties "slug" and "description".', () => {
      return request(app)
        .get('/topics')
        .expect(200)
        .then(({ body }) => {
          console.log(body)
        })
    })
  })
})
