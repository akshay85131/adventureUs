const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  text: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  note: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
const todo = mongoose.model('todo', todoSchema)
module.exports = todo
