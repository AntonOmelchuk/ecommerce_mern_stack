const express = require('express')

const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const { read, list, create, update, remove } = require('../controllers/category')

router.get('/categories', list)
router.get('/category/:slug', read)
router.post('/category', authCheck, adminCheck, create)
router.put('/category/:slug', authCheck, adminCheck, update)
router.delete('/category/:slug', authCheck, adminCheck, remove)

module.exports = router
