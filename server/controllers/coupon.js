const Coupon = require('../models/coupon')
const User = require('../models/user')
const Cart = require('../models/cart')

exports.create = async (req, res) => {
  try {
    console.log('req body: ', req.body)
    const { name, discount, expire } = req.body
    const coupon = await new Coupon({
      name,
      discount,
      expire
    }).save()
    console.log('saved: ', coupon)
    res.json(coupon)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.list = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 }).exec()

    res.json(coupons)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.remove = async (req, res) => {
  try {
    const { id } = req.params

    await Coupon.findByIdAndDelete(id).exec()

    res.json({ ok: true})
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.applyCoupon = async (req, res) => {
  try {
    const { coupon } = req.body
    const isCouponValid = await Coupon.findOne({ name: coupon }).exec()

    if (isCouponValid === null) {
      return res.json({
        error: 'Invalid coupon'
      })
    }

    const user = await User.findOne({ email: req.user.email }).exec()

    const { total } = await Cart.findOne({
      orderedBy: user._id
    }).exec()

    const totalWithDiscount = (total - (total * isCouponValid.discount / 100)).toFixed(2)

    await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { totalWithDiscount },
      { new: true }
    ).exec()

    res.json(totalWithDiscount)
  } catch (error) {
    res.status(400).send(error)
  }
}