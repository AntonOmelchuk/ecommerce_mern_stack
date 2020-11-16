const Category = require('../models/category')
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
    res.json(category)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.create = async (req, res) => {
  try {
    const { name } = req.body
    const category = await new Category({ name, slug: slugify(name) }).save()
    res.json(category)
  } catch (error) {
    const msg = error.code == 11000 ? 'Category is already exists' : error
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

    res.json(updated)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.remove = async (req, res) => {
  try {
    const { slug } = req.params
    const deleted = await Category.findOneAndDelete({ slug }).exec()

    if (deleted) {
      res.json(deleted)
    } else {
      res.send('Category is not existing')
    }
  } catch (error) {
    res.status(400).send('Delete category failed')
  }
}
