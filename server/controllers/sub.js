const Sub = require('../models/sub')
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

    if (sub) return res.json(sub)
    else return res.send(`Sub ${slug} not found`)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.create = async (req, res) => {
  try {
    const { name } = req.body

    const sub = await new Sub({ name, slug: slugify(name) }).save()
    if (sub) return res.json(sub)
    else return res.send(`Sub ${slug} not created`)
  } catch (error) {
    res.status(400).send(error)
  }
}
