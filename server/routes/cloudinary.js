const express = require('express')

const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const { upload, remove } = require('../controllers/cloudinary')

router.post('/images', authCheck, adminCheck, upload)
router.post('/images/remove', authCheck, adminCheck, remove)

module.exports = router
