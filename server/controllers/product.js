const Product = require('../models/product')
const slugify = require('slugify')

exports.create = async (req, res) => {
  try {
    console.log('recieved data: ', req.body)
    req.body.slug = slugify(req.body.title)

    const product = await new Product(req.body).save()

    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(400).send('Create product failed')
  }
}
