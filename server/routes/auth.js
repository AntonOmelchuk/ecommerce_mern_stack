const express = require('express')

const route = express.Router()

// middlewares
const authCheck = require('../middlewares/auth')

// controllers
const { createOrUpdateUser } = require('../controllers/auth')

route.post('/create-or-update-user', authCheck, createOrUpdateUser)

module.exports = route
