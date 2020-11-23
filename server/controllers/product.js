const Product = require('../models/product')
const slugify = require('slugify')

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).exec()
    console.log('server products: ', products)
    res.json(products)
  } catch (error) {
    res.status(400).send('Get products failed')
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
    res.status(400).send('Create product failed')
  }
}
