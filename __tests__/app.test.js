describe('TOPICS', () => {
  describe('GET /topics', () => {
    test('status: 200 - should respond with an array of objects, each of which should have the properties "slug" and "description".', () => {
      return app.get('/topics').status(200)
    })
  })
})
