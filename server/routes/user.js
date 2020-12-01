const express = require('express')

const router = express.Router()

const { authCheck } = require('../middlewares/auth')

const { saveCart, getCart, emptyCart } = require('../controllers/user')

// User cart
router.post('/cart', authCheck, saveCart)
router.get('/cart', authCheck, getCart)
router.delete('/cart', authCheck, emptyCart)

module.exports = router
