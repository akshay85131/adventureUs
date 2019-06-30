// you have to import model schema here\
// import { trips } from '../models/config'
const { trips } = require('../models/config')
// const uuidv1 = require('uuid/v1')
const postNewTrip = async (req, res) => {
  // console.log(req)
  try {
  const Trip = {
    tripName: req.body.tripName,
    stratdate: req.body.startDate,
    enddate: req.body.endDate
    // id: uuidv1()
  }
  console.log(req.body)
  const tripData = await  trips.create(Trip)
  res.json('data added successfully')
}
catch (error) {
      res.json(error)
    }
}
const check = (req, res) =>{
  res.json('hellooo im working fine')
}

const tripsById = async (req, res) => {
  try {
    const tripData = await tripS.findById(req.params.id)
    res.json(tripData)
  } catch (error) {
    res.json(error)
  }
}
const allTrip = async (req, res) => {
  try {
    const datas = await trip.find()
    res.json(datas)
  } catch (error) {
    res.json(error)
  }
}

module.exports = { postNewTrip, check }
