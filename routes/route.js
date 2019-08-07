// import express from 'express'
const express = require('express')
const mail = require('../control/mail')
const { postNewTrip, allTrip, tripsById, updateTrip, deleteTrip } = require('../control/helpers')
const router = express.Router()

router.get('/all', allTrip)
router.post('/sendMail', mail)
// router.post('/updateitinearary', itineraryDataUpdate)
router.post('/new', postNewTrip)
router.put('/updatetrip', updateTrip)
router.get('/:id', tripsById)
router.delete('/delete/:id', deleteTrip)

module.exports = router
