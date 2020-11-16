const express = require('express')

const route = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const { read, list, create, update, remove } = require('../controllers/category')

route.get('/categories', list)
route.get('/category/:slug', authCheck, adminCheck, read)
route.post('/category', authCheck, adminCheck, create)
route.put('/category/:slug', authCheck, adminCheck, update)
route.delete('/category/:slug', authCheck, adminCheck, remove)

module.exports = route
