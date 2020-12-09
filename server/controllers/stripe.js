const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Coupon = require('../models/coupon')

const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.createPayment = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currence: 'usd'
    })

    res.send({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    res.status(400).send(error)
  }
}

