const Sub = require('../models/sub')
const Product = require('../models/product')
const slugify = require('slugify')

exports.list = async (req, res) => {
  try {
    const subs = await Sub.find({}).sort({ createdAt: -1 }).exec()
    res.json(subs)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.read = async (req, res) => {
  try {
    const { slug } = req.params

    const sub = await Sub.findOne({ slug }).exec()
    const products = await Product.find({ subs: sub }).populate('category').exec()

    if (sub) return res.json({ sub, products })
    else return res.send(`Sub ${slug} not found`)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.create = async (req, res) => {
  try {
    const { name, category } = req.body

    const sub = await new Sub({ name, slug: slugify(name), parent: category }).save()
    if (sub) return res.json(sub)
    else return res.send(`Sub ${slug} not created`)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.update = async (req, res) => {
  try {
    const { name } = req.body
    const { slug } = req.params

    const updated = await Sub.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    )
    if (updated) return res.json(updated)
    else return res.send(`Sub ${updated} not updated`)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.remove = async (req, res) => {
  try {
    const { slug } = req.params

    const deleted = await Sub.findOneAndDelete({ slug }).exec()

    if (deleted) return res.json(deleted)
    else return res.send(`Sub ${deleted} not deleted`)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.getCategorySub = async (req, res) => {
  try {
    const { _id } = req.params

    const subs = await Sub.find({ parent: _id })

    res.json(subs)
  } catch (error) {
    res.status(400).send(error)
  }
}
