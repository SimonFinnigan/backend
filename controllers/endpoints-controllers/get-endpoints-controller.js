const fs = require('fs')

const getEndpoints = (req, res, next) => {
  let allEndpoints
  fs.readFile('endpoints.json', 'utf8', function (err, data) {
    allEndpoints = JSON.parse(data)
    res.status(200).send(allEndpoints)
  })
}
module.exports = getEndpoints
