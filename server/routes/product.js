const express = require('express')

const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const { getProducts, read, create, remove, update, sortList, total } = require('../controllers/product')

// routes
router.get('/products/:count', getProducts)
router.get('/product/:slug', authCheck, adminCheck, read)
router.post('/products', authCheck, adminCheck, create)
router.delete('/products/:slug', authCheck, adminCheck, remove)
router.put('/product/:slug', authCheck, adminCheck, update)
router.post('/products-sort', sortList)
router.get('/products-total', total)

module.exports = router
