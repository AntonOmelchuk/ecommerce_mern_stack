const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')
const Order = require('../models/order')

exports.saveCart = async (req, res) => {
  try {
    const { cart } = req.body

    if (cart && cart.length > 0) {
      const user = await User.findOne({ email: req.user.email }).exec()

      const products = []

      const isCartExist = await Cart.findOne({ orderedBy: user._id }).exec()

      if (isCartExist) {
        isCartExist.remove()
      }

      for(let i = 0; i < cart.length; i++) {
        const cartItem = {}

        cartItem.product = cart[i]._id
        cartItem.count = cart[i].count
        cartItem.color = cart[i].color

        const { price } = await Product.findById(cart[i]._id).select('price').exec()

        cartItem.price = price
        products.push(cartItem)
      }
      const total = products.reduce((acc, item) => acc + (item.count * item.price), 0)

      const newCart = await new Cart({
        products,
        total,
        orderedBy: user._id
      }).save()
      console.log('server new cart: ', newCart)
      res.json({ ok: true })
    }
  } catch (error) {
    console.log('error: ', error)
    res.status(400).send(error)
  }
}

exports.getCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })

    const cart = await Cart.findOne({ orderedBy: user._id})
      .populate('products.product', '_id title price totalWithDiscount')
      .exec()
    const { products, total, totalWithDiscount } = cart

    res.json({ products, total, totalWithDiscount })
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec()
    const cart = await Cart.findOneAndDelete({ orderedBy: user._id }).exec()

    res.json(cart)
  } catch (error) {
    console.log('error: ', error)
    res.status(400).send(error)
  }
}

exports.saveAddress = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { email: req.user.email },
      { address: req.body.address }
    )

    res.json({ ok: true })
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.getAddress = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })

    if (user.address) {
      res.json(user.address)
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.createOrder = async (req, res) => {
  try {
    const {paymentIntent} = req.body.stripeResponse

    const user = await User.findOne({ email: req.user.email }).exec()

    const { products } = await Cart.findOne({ orderedBy: user._id }).exec()

    const newOrder = new Order({
      products,
      paymentIntent,
      orderedBy: user._id
    }).save()


    const bulkOptions = products.map(item => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count } }
        }
      }
    })
    const updated = await Product.bulkWrite(bulkOptions, {})
    res.json({ ok: true })
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.getOrders = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec()

    const userOrders = await Order.find({ orderedBy: user._id })
      .populate('products.product')
      .exec()

    res.json(userOrders)
  } catch (error) {
    res.status(400).send(error)
  }
}
