const express = require('express')

const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const { read, list, getCategorySub, create, update, remove } = require('../controllers/sub')

router.get('/subs', list)
router.get('/sub/:slug', read)
router.get('/subs/:_id', getCategorySub)
router.post('/sub', authCheck, adminCheck, create)
router.put('/sub/:slug', authCheck, adminCheck, update)
router.delete('/sub/:slug', authCheck, adminCheck, remove)

module.exports = router
