// import express from 'express'
const express = require('express')
const { postNewTrip, allTrip, tripsById, updateTrip, deleteTrip } = require('../control/helpers')
const router = express.Router()

router.get('/trips/all', allTrip)
// router.post('/trips/updateitinearary', itineraryDataUpdate)
router.post('/trips/new', postNewTrip)
router.put('/trips/updatetrip', updateTrip)
router.get('/trips/:id', tripsById)
router.delete('/trips/delete/:id', deleteTrip)

module.exports = router
