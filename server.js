const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const passport = require('passport')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')
const tripRoutes = require('./routes/route')
require('dotenv').config()
// var cors = require('cors')

// const RedisStore = require('connect-redis')(session)
// const MongoStore = require('connect-mongo')(session)
app.use(bodyParser.json())
app.use(function (req, res, next) {
  // console.log(req)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
// app.use(cors())
// const { trips } = require('../models/config')
app.use(express.static('views'))
app.use(bodyParser.urlencoded({ extended: true }))
const mongoose = require('mongoose')
// const RedisStore = require('connect-redis')(session)
mongoose.connect('mongodb://localhost/trip')

app.use(session({
  // store: new MongoStore({
  //   mongooseConnection: mongoose.connection,
  //   autoRemove: 'interval',
  //   autoRemoveInterval: 10
  // }),
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

app.post('/register', function (req, res) {
  const password = req.body.password
  // const password2 = req.body.password2
  if (password) {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      // username: req.body.username,
      password: req.body.password
    })
    User.createUser(newUser, function (err, user) {
      if (err) throw err
      // res.send(user).end()
      res.status(201).send({ msg: 'Account Created Successfully' })
    })
  } else {
    res.status(500).send("{errors: \"Passwords don't match\"}").end()
  }
})

passport.use(new LocalStrategy({
  usernameField: 'email'
},
function (email, password, done) {
  // console.log('email' + email)
  User.getUserByEmail(email, function (err, user) {
    if (err) throw err
    if (!user) {
      return done(null, false, { message: 'Unknown User' })
    }
    User.comparePassword(password, user.password, function (err, isMatch) {
      if (err) throw err
      if (isMatch) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Invalid password' })
      }
    })
  })
}
))
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

// const isLoggedIn = async (req, res, next) => {
//   if (req.session.passport !== undefined) {
//     return next()
//   }
//   res.status(401).send('loggin first')
// }

// app.use('/trips', isLoggedIn, tripRoutes)
app.use('/trips', tripRoutes)

io.on('connection', (socket) => {
  console.log('inside socket')
  // console.log(socket)
})

io.on('connection', function (socket) {
  socket.on('trip', function (message) {
    console.log('message : ' + message)
  })
})

io.on('connection', (socket) => {
  socket.on('trip', (message) => {
    console.log('message : ', message)
    io.emit('trip', message)
  })
})
server.listen(PORT, () => {
  console.log(`Magic Happening on ${PORT}`)
})
