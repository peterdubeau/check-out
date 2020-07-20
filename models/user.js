const mongoose = require('mongoose')
const Schema = mongoose.Schema


const User = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    imgURL: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('user', User)