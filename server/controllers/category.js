const Category = require('../models/category')
const Product = require('../models/product')
const slugify = require('slugify')

exports.list = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: - 1 }).exec()
    res.json(categories)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.read = async (req, res) => {
  try {
    const { slug } = req.params
    const category = await Category.findOne({ slug }).exec()

    const products = await Product.find({ category })
      .populate('category')
      .exec()

    res.json({ category, products })
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.create = async (req, res) => {
  const { name } = req.body
  try {
    const category = await new Category({ name, slug: slugify(name) }).save()

    if (category) return res.json(category)
    else return res.send(`Sub ${category} not created`)
  } catch (error) {
    const msg = error.code == 11000 ? `Category "${name}" is already exists` : error
    res.status(400).send(`Create category failed. ${msg}`)
  }
}

exports.update = async (req, res) => {
  try {
    const { slug } = req.params
    const { name } = req.body

    const updated = await Category.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    )

    if (updated) return res.json(updated)
    else return res.send(`Category ${updated} not updated`)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.remove = async (req, res) => {
  try {
    const { slug } = req.params
    const deleted = await Category.findOneAndDelete({ slug }).exec()

    if (deleted) return res.json(deleted)
    else return res.send(`Category ${deleted} not deleted`)
  } catch (error) {
    res.status(400).send('Delete category failed')
  }
}
