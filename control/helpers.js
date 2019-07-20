const { trips } = require('../models/config')
var moment = require('moment')
// moment().format()
var difference
const postNewTrip = async (req, res) => {
  try {
    var start = moment(req.body.startDate, 'DD-MM-YYYY')
    var end = moment(req.body.endDate, 'DD-MM-YYYY')
    difference = (moment.duration(start.diff(end)).asDays())
    const Trip = {
      tripName: req.body.tripName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      itinearary: []
    }
    const newIti = createItinearary(Math.abs(difference), Trip.startDate)
    Trip.itinearary = newIti
    const newTripData = await trips.create(Trip)
    res.status(200).json(`data added successfully${newTripData}`) // i hav to semd id
  } catch (error) {
    res.status(400).json(error)
  }
}

const tripsById = async (req, res) => {
  try {
    const tripData = await trips.findById(req.params.id)
    res.status(200).json(tripData)
  } catch (error) {
    res.status(404).json(error)
  }
}
const allTrip = async (req, res) => {
  try {
    console.log(difference)
    const allTripsData = await trips.find()
    res.status(200).json(allTripsData)
  } catch (error) {
    res.status(404).json(error)
  }
}
const updateTrip = async (req, res) => {
  try {
    const updatedTripData = await trips.findOneAndUpdate({ _id: req.body.id },
      { tripName: req.body.tripName }, { new: true })
    // console.log(req.body)
    res.status(200).json(updatedTripData)
  } catch (error) {
    res.status(404).json(error)
  }
}
const deleteTrip = async (req, res) => {
  try {
    const deletedTrip = await trips.findOneAndDelete({ _id: req.params.id })
    res.status(200).json(`item deleted ${deletedTrip.tripName}`)
  } catch (error) {
    res.status(404).json(error)
  }
}

const createItinearary = (difference, startDate) => {
  console.log(difference, startDate)
  console.log('Im in kehooooooooooo')
  const itineraryArray = []
  for (let i = 1; i <= difference; i++) {
    const Itinearay = {
      day: i,
      date: moment(startDate, 'DD-MM-YYYY').add('days, 1'),
      location: null,
      activity: null
    }
    itineraryArray.push(Itinearay)
  }
  return itineraryArray
}

module.exports = { postNewTrip, allTrip, tripsById, updateTrip, deleteTrip }
// module.exports =  postNewTrip
