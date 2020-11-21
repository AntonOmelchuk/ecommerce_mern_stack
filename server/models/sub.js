const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

const subSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: [2, 'Min length is 2 characters'],
    maxlength: [32, 'Max length is 32 characters'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  parent: {
    type: ObjectId,
    ref: 'Category',
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Sub', subSchema)
