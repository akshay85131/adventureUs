const express = require('express')
const bodyParser = require('body-parser')
const tripRoutes = require('./routes/route')
const app = express()
const passport = require('passport')
const PORT = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
require('./control/auth')

const UserModel = require('./models/user')
const routes = require('./routes/authRoutes')
const secureRoute = require('./routes/secureRoutes')

app.use('/', routes)
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute)
app.use('/', tripRoutes)

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({ error: err })
})
app.listen(PORT, () => {
  console.log(`Magic Happening on ${PORT}`)
})
