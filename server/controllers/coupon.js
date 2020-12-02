const Coupon = require('../models/coupon')

exports.create = async (res, res) => {
  try {
    const { name, discount, expire } = req.body
    const coupon = await new Coupon({
      name,
      discount,
      expire
    }).save()

    res.json(coupon)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.list = async (res, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 }).exec()

    res.json(coupons)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.remove = async (res, res) => {
  try {
    const { id } = req.body

    await Coupon.findByIdAndDelete(id).exec()

    res.json({ ok: true})
  } catch (error) {
    res.status(400).send(error)
  }
}
