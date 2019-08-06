const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
// const io = require('socket.io')(server)
const passport = require('passport')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000
// const uuid = require('uuid/v4')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
// const FileStore = require('session-file-store')(session)
// const passportLocalMongoose = require('passport-local-mongoose')
const User = require('./models/user')
const tripRoutes = require('./routes/route')
// const routes = require('./routes/authRoutes')
// const secureRoute = require('./routes/secureRoutes')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'Akshay13578111851171',
  resave: true,
  saveUninitialized: true

}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
// app.use('/', routes)
// app.use('/user', passport.authenticate('local'), tripRoutes)
app.use('/', passport.authenticate('local'), tripRoutes)
// console.log(session.id)
// Register User
app.post('/register', function (req, res) {
  const password = req.body.password
  const password2 = req.body.password2
  if (password === password2) {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
    User.createUser(newUser, function (err, user) {
      if (err) throw err
      res.send(user).end()
    })
  } else {
    res.status(500).send("{errors: \"Passwords don't match\"}").end()
  }
})
// const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function (username, password, done) {
    User.getUserByUsername(username, function (err, user) {
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
// Endpoint to login
var userSession
app.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    userSession = req.session.passport
    // console.log(req.session)
    // console.log(req.session.passport.user)
    // console.log(req.session.id)
    res.send(req.user)
  }
)
// console.log('userSession ' + userSession)
// console.log('userSession ' + userSession)
// console.log('In the server' + session.passport.User)
// Endpoint to get current user
app.get('/user', function (req, res) {
  res.send(req.user)
})

// Endpoint to logout
app.get('/logout', function (req, res) {
  req.logout()
  res.send(null)
})

app.use('/trips', passport.authenticate('local'), tripRoutes)
// console.log('server' + session.user)

server.listen(PORT, () => {
  console.log(`Magic Happening on ${PORT}`)
})

module.exports = userSession
