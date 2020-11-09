const express = require('express')

const route = express.Router()

// imports controllers
const { createOrUpdateUser } = require('../controllers/auth')

route.get('/create-or-update-user', createOrUpdateUser)

module.exports = route
