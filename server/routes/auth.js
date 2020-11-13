const express = require('express')

const route = express.Router()

// middlewares
const authCheck = require('../middlewares/auth')

// controllers
const { createOrUpdateUser, currentUser } = require('../controllers/auth')

route.post('/create-or-update-user', authCheck, createOrUpdateUser)

route.post('/current-user', authCheck, currentUser)

module.exports = route
