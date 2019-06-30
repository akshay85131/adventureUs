// import express from 'express'
// import bodyParser from 'body-parser'
// import tripRoutes from './routes/route'

const express = require('express')
const bodyParser = require('body-parser')
const tripRoutes = require('./routes/route')
const app = express()
const PORT = 3000
// import mongoose from 'mongoose'
// import postNewTrip from './control/helpers'
// require('./models/config')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/check', (req, res) => {
//   res.json('hello')
// })
app.use('/', tripRoutes)
// app.post('/postNewTrip', (req, res) => {
//   const newTrip = postNewTrip()
// })
app.listen(PORT, () => {
  console.log(`Magic Happening on ${PORT}`)
})
