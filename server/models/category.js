const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Nami is required',
    minlength: [2, 'Min length is 2 characters'],
    maxlength: [32, 'Max length is 32 characters'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  }
}, { timestamps: true })


module.exports = mongoose.model('Category', categorySchema)
