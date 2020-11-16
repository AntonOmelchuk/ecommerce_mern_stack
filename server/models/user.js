const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    idnex: true
  },
  role: {
    type: String,
    default: 'subscriber'
  },
  cart: {
    type: Array,
    default: []
  },
  address: String
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
