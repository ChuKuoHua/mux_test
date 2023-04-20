function successHandle(res, data) {
  res.status(200).send({
    "status": "success",
    data
  });
}

module.exports = successHandle