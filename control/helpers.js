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
module.exports = { postNewTrip, allTrip, tripsById, updateTrip, deleteTrip }
// module.exports =  postNewTrip 

