const Order = require('../models/order')

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
    .sort("-createdAt")
    .populate('products.product')
    .exec()

    res.json(orders)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.orderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body

    const updated = await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true }).exec()

    res.json(updated)
  } catch (error) {
    res.status(400).send(error)
  }
}

