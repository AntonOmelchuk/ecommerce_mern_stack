const express = require('express')

const router = express.Router()

const { authCheck } = require('../middlewares/auth')

const { saveCart, getCart } = require('../controllers/user')

// User cart
router.post('/cart', authCheck, saveCart)
router.get('/cart', authCheck, getCart)

module.exports = router
