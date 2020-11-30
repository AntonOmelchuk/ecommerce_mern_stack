const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: ObjectId,
        ref: 'Product'
      },
      count: Number,
      color: String,
      price: Number
    }
  ],
  total: Number,
  totalWithDiscount: Number,
  orderedBy: {
    type: ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)
