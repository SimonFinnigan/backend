// import app
const app = require('./app')
// create channel for server
const port = 9090

// listen for connection
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
