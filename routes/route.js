// import express from 'express'
const express = require('express')
const { postNewTrip, allTrip, tripsById, updateTrip, deleteTrip } = require('../control/helpers')
// import { postNewTrip, check } from '../control/helpers'
const router = express.Router()

// router.route('/')
//   .post(postNewTrip)
//   .get(allTrip)
//   .put(updateTrip)

router.get('/trips/alltrips', allTrip)
router.post('/trips/postnewtrip', postNewTrip)
router.put('/trips/updatetrip', updateTrip)

// router.route('/:id')
// .get(tripsById)
// .delete(deleteTrip)
router.get('trips/:id', tripsById)
router.delete('/trips/delete/:id', deleteTrip)


module.exports = router
