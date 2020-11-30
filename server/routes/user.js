const express = require('express')

const router = express.Router()

const { authCheck } = require('../middlewares/auth')

const { saveCart } = require('../controllers/user')

router.post('/cart', authCheck, saveCart)

module.exports = router
