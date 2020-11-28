const Product = require('../models/product')
const User = require('../models/user')
const slugify = require('slugify')
const { populate } = require('../models/user')

exports.getProducts = async (req, res) => {
  try {
    const count = req.params?.count ? req.params.count : 10
    const products = await Product.find({})
      .limit(parseInt(count))
      .populate('category')
      .populate('subs')
      .sort([['createdAt', 'desc']])
      .exec()

      res.json(products)
  } catch (error) {
    res.status(400).send('Get products failed')
  }
}

exports.read = async (req, res) => {
  try {
    const { slug } = req.params

    const product = await Product.findOne({ slug }).populate('category').populate('subs').exec()

    res.json(product)
  } catch (error) {
    console.log('error: ', error)
    res.status(400).send('Get product details failed')
  }
}

exports.create = async (req, res) => {
  try {
    const { product } = req.body

    product.slug = slugify(product.title)
    const newProduct = await new Product(product).save()

    res.json(newProduct)
  } catch (error) {
    console.error(error)
    res.json({ message: 'Create product failed' })
  }
}

exports.remove = async (req, res) => {
  try {
    const { slug } = req.params

    const deleted = await Product.findOneAndRemove({ slug }).exec()

    res.json(deleted)
  } catch (error) {
    return res.status(400).send('Product delete failed')
  }
}

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }

    const updated = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true })

    res.json(updated)
  } catch (error) {
    res.status(400).send('Product update failed')
  }
}

exports.sortList = async (req, res) => {
  try {
    const { sort, order, page } = req.body

    const currentPage = page || 1
    const perPage = 3

    const sortedList = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('sub')
      .sort([[sort, order]])
      .limit(perPage)
      .exec()

    res.json(sortedList)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.total = async (req, res) => {
 try {
  const total = await Product.find({}).estimatedDocumentCount().exec()
  res.json(total)
 } catch (error) {
   res.status(400).send(error)
 }
}

exports.getProductDetails = async (req, res) => {
  try {
    const { slug } = req.params

    const product = await Product.findOne({ slug })
    .populate('category')
    .populate('subs')
    .exec()

    res.json(product)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.handleRating = async (req, res) => {
  try {
    const { productId } = req.params
    const { star } = req.body

    const product = await Product.findById(productId).exec()
    const user = await User.findOne({ email: req.user.email })

    const productWithRating = product.ratings.find(item => item.postedBy.toString() === user._id.toString())

    if (productWithRating) {
      const updatedProduct = await Product.updateOne(
        { ratings: { $elemMatch: productWithRating } },
        { $set: { 'ratings.$.star': star} },
        { new: true }
      ).exec()

      res.json(updatedProduct)
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        {
          $push: { ratings: { star, postedBy: user._id } }
        },
        { new: true }
      ).exec()

      res.json(updatedProduct)
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.getRelated = async (req, res) => {
  try {
    const { category } = req.params

    const products = await Product.find({})
    const relatedProducts = products.filter(product => product.category.toString() === category.toString())

    res.json(relatedProducts)
  } catch (error) {
    res.status(400).send(error)
  }
}

const handleQuery = async (req, res, query) => {
  const proudcts = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec()
  console.log('products: ', proudcts)
  res.json(proudcts)
}

exports.search = async (req, res) => {
  try {
    const { query } = req.body

    if (query) {
      console.log('query: ', query)
      await handleQuery(req, res, query)
    }
  } catch (error) {
    res.status(400).send(error)
  }
}
