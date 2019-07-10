// import express from 'express'
// import bodyParser from 'body-parser'
// import tripRoutes from './routes/route'

const express = require('express')
const bodyParser = require('body-parser')
const tripRoutes = require('./routes/route')
const app = express()
// const passport = require('passport')
// const cookieSession = require('cookie-session')
// const LocalStrategy = require('passport-local').Strategy
const PORT = 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cookieSession)({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false
// })
// app.use(passport.initialize())
// app.use(passport.session())

// const user =require('./models/user')
// passport.use(new LocalStrategy(user.authenticate()))
// passport.serializeUser(user.serializeUser())
// passport.deserializeUser(user.deserializeUser())
// app.get('/', (req, res) => {
//   res.json('hello')
// })
app.use('/', tripRoutes)
// app.post('/postNewTrip', (req, res) => {
//   const newTrip = postNewTrip()
// })
app.listen(PORT, () => {
  console.log(`Magic Happening on ${PORT}`)
})
