const response = (status_code, data, message, res) => {
  res.status(status_code).json({
    status_code,
    payload: data,
    message,
    pagination: {
      prev: '',
      next: '',
      max: '',
    },
  })
}

module.exports = response
