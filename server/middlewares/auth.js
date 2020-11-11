const admin = require('../firebase')

const authCheck = (req, res, next) => {
  console.log('request: ', req.headers)
  next()
}

module.exports = authCheck
