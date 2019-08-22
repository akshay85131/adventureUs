const { trips } = require('../models/config')
const { todo } = require('../models/config')
const moment = require('moment')
const uuidv1 = require('uuid/v1')
const userSession = require('../server')
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
      itinearary: [],
      admin: ''
    }
    const startDate = moment(Trip.startDate, 'DD-MM-YYYY')
    const newIti = createItinearary(Math.abs(difference), startDate)
    Trip.itinearary = newIti
    const adminName = await trips.findById(userSession)
    Trip.admin = adminName.name
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
    const allTripsData = await trips.find()
    const allTrips = allTripsData.map(obj => {
      const trips = {}
      trips['tripName'] = obj.tripName
      trips['id'] = obj._id
      trips['createdAt'] = obj.createdAt
      return trips
    })
    res.status(200).json({ allTrips })
  } catch (error) {
    res.status(404).json(error)
  }
}

const updateTrip = async (req, res) => {
  try {
    const updatedTripData = await trips.findOneAndUpdate({ _id: req.body.id },
      { tripName: req.body.tripName }, { new: true })
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
  const itineraryArray = []
  for (let i = 1; i <= difference; i++) {
    const Itinearay = {
      day: i,
      id: uuidv1(),
      date: startDate.add(1, 'days').format('DD-MMMMM-YYYY'),
      location: '',
      activity: ''
    }
    itineraryArray.push(Itinearay)
  }
  return itineraryArray
}

const particularItinearayData = async (req, res) => {
  try {
    const itineraryData = await trips.findById(req.params.id)
    res.status(200).json(itineraryData.itinearary)
  } catch (error) {
    res.status(404).json(error)
  }
}
// const itineraryLocationUpdate = (id, data) => {
//   trips.findById(id, (err, trips) => {
//     if (err) return err
//     console.log(trips)
//   })
// }

// const itineraryLocationUpdate = async (req, res) => {
//   try {
//     const updatedLocationData = await trips.itinearary.findOneAndUpdate({ _id: req.body.id },
//       { location: req.body.location }, { new: true })
//     // console.log(req.body)
//     res.status(200).json(updatedLocationData)
//   } catch (error) {
//     res.status(404).json(error)
//   }
// }

// const itineraryActivityUpdate = async (req, res) => {
//   try {
//     const neraryActivityUpdate = await trips.itinearary.findOneAndUpdate({ _id: req.body.id },
//       { activity: req.body.activity }, { new: true })
//     // console.log(req.body)
//     res.status(200).json(neraryActivityUpdate)
//   } catch (error) {
//     res.status(404).json(error)
//   }
// }
// const itineraryActivityDelete = async (req, res) => {
//   try {
//     const activityDel = await trips.itinearary.findOneAndDelete({ _id: req.params.id })
//     res.status(200).json(`item deleted ${activityDel}`)
//   } catch (error) {
//     res.status(404).json(error)
//   }
// }

// Todo logic
const createTodo = async (req, res) => {
  try {
    const user = await trips.findById(req.body.userId)
    const Todo = {
      text: req.body.text,
      completed: req.body.completed,
      note: req.body.note
    }
    const newTodo = await todo.create(Todo)
    const resData = {
      _id: newTodo.id,
      createdAt: newTodo.createdAt
    }
    user['todo'] = newTodo

    res.status(201).send(resData)
  } catch (error) {
    res.status(404).json(error)
  }
}

const updateTodoTask = async (req, res) => {
  try {
    const userId = req.body.userId
    const user = await trips.findById(userId)
    const updatedTodo = await user.todo.findOneAndUpdate({ id: req.body.taskId },
      { tripName: req.body.text }, { new: true })
    res.status(200).json({ msg: 'Data Updated' })
  } catch (error) {
    res.status(404).json(error)
  }
}

const deleteTask = async (req, res) => {
  try {
    const user = await trips.findById(req.body.userId)
    const deleteTodo = await user.todo.findOneAndDelete({ id: req.body.taskId })
    res.status(200).json(`task Deleted ${deleteTodo.tripName}`)
  } catch (error) {
    res.status(404).json(error)
  }
}

module.exports = { postNewTrip, allTrip, tripsById, updateTrip, deleteTrip, particularItinearayData, createTodo, updateTodoTask, deleteTask }
