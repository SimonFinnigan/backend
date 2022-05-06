const express = require('express')
const app = express()

app.get('/topics', (req, res) => {
  res.status(200).send({ msg: 'Hello World!' })
})

module.exports = app
