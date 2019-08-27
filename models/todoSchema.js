const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
  tasks: [
    {
      id: { type: String },
      text: { type: String },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  columns: {
    todo: {
      taskIds: [{ type: String }]
    }
  },
  inprogress: {
    taskIds: [{ type: String }]
  },
  done: {
    taskIds: [{ type: String }]
  },
  columnOrder: [{ type: String }]
})
const todo = mongoose.model('todo', todoSchema)
module.exports = todo
