// import express from 'express'
const express = require('express')
const { postNewTrip, allTrip, tripsById, updateTrip } = require('../control/helpers')
// import { postNewTrip, check } from '../control/helpers'
const router = express.Router()

router.route('/')
  .post(postNewTrip)
  .get(allTrip)
  
router.route('/:id')
.get(tripsById)
.put(updateTrip)

module.exports = router
