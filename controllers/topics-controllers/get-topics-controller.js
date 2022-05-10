const fetchTopics = require('../../models/topics-models/fetch-topics-model')

const getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send(topics)
    })
    .catch(next)
}

module.exports = getTopics
