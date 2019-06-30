// import mongoose from 'mongoose'
const mongoose =require('mongoose')
const tripSchema = new mongoose.Schema({

  tripName: { type: String, defalut: 'none', trim: true },

  startDate: { type: String, defalut: 'none', trim: true },

  endDate: { type: String, defalut: 'none', trim: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
const trips = mongoose.model('trips', tripSchema)
module.exports =  trips
