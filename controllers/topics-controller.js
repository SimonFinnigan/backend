const fetchTopics = require('../models/topics-models')

const getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send(topics)
    })
    .catch(next)
}

module.exports = getTopics
