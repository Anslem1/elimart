const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20
    },
    fullName: {
      type: String,
      trim: true,
      min: 3,
      max: 20
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    contact: {
      type: String
    },
    profilePicture: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

// userSchema.virtual('password')

module.exports = mongoose.model('User', userSchema)
