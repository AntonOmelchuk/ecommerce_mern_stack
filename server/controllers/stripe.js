const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Coupon = require('../models/coupon')

const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.createPayment = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec()
    const {total, totalWithDiscount} = await Cart.findOne({ orderedBy: user._id }).exec()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: (totalWithDiscount || total) * 100,
      currency: 'usd'
    })
    res.send({
      clientSecret: paymentIntent.client_secret,
      total,
      totalWithDiscount,
      payable: (totalWithDiscount || total) * 100
    })
  } catch (error) {
    res.status(400).send(error)
  }
}

