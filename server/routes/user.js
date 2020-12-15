const express = require('express')

const router = express.Router()

const { authCheck } = require('../middlewares/auth')

const { saveCart, getCart, emptyCart, saveAddress, getAddress, createOrder, getOrders } = require('../controllers/user')

// User cart
router.post('/cart', authCheck, saveCart)
router.get('/cart', authCheck, getCart)
router.delete('/cart', authCheck, emptyCart)
router.post('/address', authCheck, saveAddress)
router.get('/address', authCheck, getAddress)

// User order
router.post('/user/order', authCheck, createOrder)
router.get('/user/orders', authCheck, getOrders)

module.exports = router
