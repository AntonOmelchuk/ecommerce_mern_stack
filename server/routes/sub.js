const express = requie('express')

const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const { read, list, create, update, remove } = require('../controllers/sub')

route.get('/subs', list)
route.get('/sub/:slug', read)
route.post('/sub', authCheck, adminCheck, create)
route.put('/sub/:slug', authCheck, adminCheck, update)
route.delete('/sub/:slug', authCheck, adminCheck, remove)

module.exports = route
