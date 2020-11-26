const Product = require('../models/product')
const slugify = require('slugify')

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
