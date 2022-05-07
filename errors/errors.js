const handle404Errors = (req, res, next) => {
  res.status(404).send({ msg: 'Not Found' })
}

const handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg })
  } else next(err)
}

const handlePsqlErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Invalid input' })
  } else next(err)
}

const handleServerErrors = (err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: 'Internal Server Error' })
}

module.exports = {
  handle404Errors,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
}
