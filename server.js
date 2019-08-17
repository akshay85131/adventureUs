const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
// const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')
const tripRoutes = require('./routes/route')
require('dotenv').config()
// var cors = require('cors')
const PORT = process.env.PORT || 3000
const connection = require('./models/config')
const MongoStore = require('connect-mongo')(session)
app.use(bodyParser.json())
app.use(function (req, res, next) {
  // console.log(req)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(express.static('views'))
app.use(bodyParser.urlencoded({ extended: true }))
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_HOST)

app.use(session({
  store: new MongoStore({
    // mongooseConnection: mongoose.connection,
    mongooseConnection: mongoose.connection,
    autoRemove: 'interval',
    autoRemoveInterval: 10
  }),
  key: 'user_sid',
  secret: 'Akshay13578111851171',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

// app.use(function printSession (req, res, next) {
//   // console.log('req.session', req.session)
//   return next()
// })

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user)
  })
})

// var userCookie
app.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    const user = req.user.name
    res.status(200).send({ user })
  }
)

// Endpoint to logout
app.get('/logout', (req, res) => {
  req.logout()
  res.clearCookie('user_sid')
  res.status(200).send('user logged Out')
})

const isLoggedIn = async (req, res, next) => {
  if (req.session.passport !== undefined) {
    return next()
  }
  res.status(401).send('loggin first')
}

app.use('/trips', isLoggedIn, tripRoutes)
app.use('/', tripRoutes)
// app.use('/trips', tripRoutes)


server.listen(PORT, () => {
  console.log(`Magic Happening on ${PORT}`)
})
