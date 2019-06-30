// import express from 'express'
const express = require('express')
const { postNewTrip, check } = require('../control/helpers')
// import { postNewTrip, check } from '../control/helpers'
const router = express.Router()

router.route('/')
  .post(postNewTrip)
  .get(allTrip)
router.route('/:id')
.get(tripsById)

module.exports = router
