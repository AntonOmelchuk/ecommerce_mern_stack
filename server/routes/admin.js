const express = require('express')

const router = express.Router()

const { authCheck, adminCheck } = require('../middlewares/auth')

const { getOrders, orderStatus } = require('../controllers/admin')

router.get('/admin/orders', authCheck, adminCheck, getOrders)
router.put('/admin/order-status', authCheck, adminCheck, orderStatus)


module.exports = router
