const Category = require('../models/category')
const slugify = require('slugify')

exports.read = (req, res, next) => {}

exports.list = (req, res, next) => {}

exports.create = async (req, res, next) => {
  try {
    const { name } = req.body
    const category = await new Category({ name, slug: slugify(name) }).save()
    res.json(category)
  } catch (error) {
    const msg = error.code == 11000 ? 'Category is already exists' : error
    res.status(400).send(`Create category failed. ${msg}`)
  }
}

exports.update = (req, res, next) => {}

exports.remove = (req, res, next) => {}
