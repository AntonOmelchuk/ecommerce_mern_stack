const Product = require('../models/product')
const slugify = require('slugify')

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({})

    res.json(products)
  } catch (error) {
    res.status(400).send('Get products failed')
  }
}

exports.create = async (req, res) => {
  try {
    const { product } = req.body

    product.slug = slugify(product.title)
    console.log('server: ', product)
    const newProduct = await new Product(product).save()
    console.log('saved: ', newProduct)
    res.json(newProduct)
  } catch (error) {
    console.error(error)
    res.json({ message: 'Create product failed' })
  }
}
