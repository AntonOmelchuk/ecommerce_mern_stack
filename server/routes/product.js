const express = require('express')

const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const { getProducts, create } = require('../controllers/product')

// routes
router.get('/products', getProducts)
router.post('/products', authCheck, adminCheck, create)

module.exports = router
