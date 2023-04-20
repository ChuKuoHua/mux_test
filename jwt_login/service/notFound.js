const notFound = (req, res, next) => {
  res.status(404).send({
    status: 'error',
    massage: '無此路由資訊'
  })
}

module.exports = notFound