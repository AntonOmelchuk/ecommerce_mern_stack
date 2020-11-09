const express = require('express')

const route = express.Router()

route.get('/user', (req, res) => {
  res.json({
    data: `You hit /api/user api endpoint`
  })
})

module.exports = route
