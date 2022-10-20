const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoryScema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    categoryImage: { type: String },
    parentId: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Category', categoryScema)
