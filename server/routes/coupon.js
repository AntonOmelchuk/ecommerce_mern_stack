const express = require('express')

const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const { create, remove, list } = require('../controllers/product')

// routes
// GET all products
router.get('/coupons', list)
router.post('/coupons', authCheck, adminCheck, create)
router.delet('/coupons/:id', authCheck, adminCheck, remove)


module.exports = router
