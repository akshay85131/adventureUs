// import express from 'express'
const express = require('express')
const { postNewTrip, allTrip, tripsById, updateTrip, deleteTrip } = require('../control/helpers')
// import { postNewTrip, check } from '../control/helpers'
const router = express.Router()

router.route('/')
  .post(postNewTrip)
  .get(allTrip)
  .put(updateTrip)
  
router.route('/:id')
.get(tripsById)
.delete(deleteTrip)


module.exports = router
