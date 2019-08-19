// import express from 'express'
const express = require('express')
const mail = require('../control/mail')
const { postNewTrip, allTrip, tripsById, updateTrip, deleteTrip, particularItinearayData } = require('../control/helpers')
const { register } = require('../control/auth')
const router = express.Router()

router.post('/register', register)
router.get('/itinerary', particularItinearayData)
router.get('/all', allTrip)
router.post('/sendMail', mail)
// router.post('/updateitinearary', itineraryDataUpdate)
router.post('/new', postNewTrip)
router.put('/updatetrip', updateTrip)
router.get('/:id', tripsById)
router.delete('/delete/:id', deleteTrip)

module.exports = router
