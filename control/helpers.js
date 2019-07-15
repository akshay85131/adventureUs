// you have to import model schema here\
// import { trips } from '../models/config'
const { trips } = require('../models/config')
// const uuidv1 = require('uuid/v1')

const postNewTrip = async (req, res) => {
  // console.log(req)
  try {
  const Trip = {
    tripName: req.body.tripName,
    startdate: new Date(req.body.startDate),
    enddate:new Date (req.body.endDate)
    // id: uuidv1()
  }
  console.log(req.body)
  const newTripData = await  trips.create(Trip)
  res.status(200).json(`data added successfully${ newTripData.tripName }`) // i hav to semd id 
}catch (error) {
      res.status(400).json(error)
    }
}

const tripsById = async (req, res) => {
//  const id = JSON.stringify(req.params.id)
  try {
    const tripData = await trips.findById(req.params.id)
    res.status(200).json(tripData)
  } catch (error) {
    res.status(404).json(error)
  }
}
const allTrip = async (req, res) => {
try{
    const allTripsData = await trips.find()
    res.status(200).json(allTripsData)
}catch (error){
   res.status(404).json(error)}
  
}
const updateTrip = async (req,res)=>{
  try{
      const updatedTripData= await trips.findOneAndUpdate({_id:req.body.id},
          {tripName:req.body.tripName},{new:true})   
      // console.log(req.body)
      res.status(200).json(updatedTripData)
  }catch (error){
    res.status(404).json(error)
  }
}
const deleteTrip = async (req,res)=>{
  try{
      const deletedTrip= await trips.findOneAndDelete({_id:req.params.id})
      res.status(200).json(`item deleted ${deletedTrip.tripName}`)
  }catch (error){
    res.status(404).json(error)
  }
}

// const _MS_PER_DAY = 1000 * 60 * 60 * 24
// function dateDiffInDays(a, b) {
//   const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
//   const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

//   return Math.floor((utc2 - utc1) / _MS_PER_DAY)
// }
// // const a = new Date("2017-01-01"),
// //     b = new Date("2017-07-25"),
//     difference = dateDiffInDays(newTripData.startDate, newTripData.endDate)

const createItinearary = async (req,res)=>{
  try{
    const Itinearay ={
      day :{ type: Number },
date:req.body.date,
location: req.body.location,
activity: [req.body.activity ]
    }
  const newTripData = await  trips.create(Itinearay)
  res.status(200).json(`data added successfully${_id}`) // i hav to semd id 
}catch (error) {
      res.status(400).json(error)
    }
}

const itinearies = async (req, res) => {
try{
    const allItinearies = await trips.find()
    res.status(200).json(allItinearies)
}catch (error){
   res.status(404).json(error)}
  
}



module.exports = { postNewTrip, allTrip, tripsById, updateTrip, deleteTrip, createItinearary, itinearies }
// module.exports =  postNewTrip 

