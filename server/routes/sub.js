const express = require('express')

const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const { read, list, create, update, remove } = require('../controllers/sub')

router.get('/subs', list)
router.get('/sub/:slug', read)
router.post('/sub', authCheck, adminCheck, create)
router.put('/sub/:slug', authCheck, adminCheck, update)
router.delete('/sub/:slug', authCheck, adminCheck, remove)

module.exports = router
