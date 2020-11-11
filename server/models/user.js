const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    idnex: true
  },
  cart: {
    type: Array,
    default: []
  },
  address: String
}, { timestamps })

module.exports = mongoose.model('User', userSchema)
