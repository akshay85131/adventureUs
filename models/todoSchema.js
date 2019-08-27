const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
  id: { type: String },
  text: { type: String },
  inprogress: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now
  }

})
const todo = mongoose.model('todo', todoSchema)
module.exports = todo
