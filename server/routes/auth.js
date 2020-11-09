const express = require('express')

const route = express.Router()

route.get('/create-or-update-user', (req, res) => {
  res.json({
    data: `You hit 'api/create-or-update-user' api endpoint`
  })
})

module.exports = route
