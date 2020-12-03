const express = require('express')

const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const { create, remove, list, applyCoupon } = require('../controllers/coupon')

// routes
// GET all products
router.get('/coupons', list)
router.post('/coupons', authCheck, adminCheck, create)
router.delete('/coupons/:id', authCheck, adminCheck, remove)
router.post('/coupon', authCheck, applyCoupon)

module.exports = router
