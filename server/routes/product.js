const express = require('express')

const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const {
  getProducts,
  read,
  create,
  remove,
  update,
  sortList,
  total,
  getProductDetails,
  handleRating,
  getRelated,
  search
} = require('../controllers/product')

// routes
// GET all products
router.get('/products/:count', getProducts)
router.post('/products-sort', sortList)
router.get('/products/related/:category', getRelated)

router.post('/products', authCheck, adminCheck, create)
router.get('/product/:slug', authCheck, adminCheck, read)
router.get('/product-details/:slug', getProductDetails)
router.delete('/products/:slug', authCheck, adminCheck, remove)
router.put('/product/:slug', authCheck, adminCheck, update)

// total count of products
router.get('/products-total', total)

// add/update product rating star
router.put('/product-rating/:productId', authCheck, handleRating)

// search, filter
router.post('/products/search/', search)

module.exports = router
