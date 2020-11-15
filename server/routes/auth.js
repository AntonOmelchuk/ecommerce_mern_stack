const express = require('express')

const route = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const { createOrUpdateUser, currentUser, currentAdmin } = require('../controllers/auth')

route.post('/create-or-update-user', authCheck, createOrUpdateUser)

route.post('/current-user', authCheck, currentUser)

route.post('/current-admin', authCheck, adminCheck, currentUser)

module.exports = route
