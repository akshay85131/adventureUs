const express = require('express')
const bodyParser = require('body-parser')
const tripRoutes = require('./routes/route')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const passport = require('passport')
var cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000
const uuid = require('uuid/v4')
const session = require('express-session')
// const FileStore = require('session-file-store')(session)
const passportLocalMongoose = require('passport-local-mongoose')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')
// const routes = require('./routes/authRoutes')
// const secureRoute = require('./routes/secureRoutes')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'Akshay13578111851171',
  resave: true,
  saveUninitialized: true
}))
// app.use(session({ secret: 'cats' }))
app.use(passport.initialize())
app.use(passport.session())
// passport.use(User.createStrategy())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// app.use('/', routes)
// app.use('/user', passport.authenticate('local'), tripRoutes)
// app.use('/', passport.authenticate('jwt', { session: false }), tripRoutes)

// Register User
app.post('/register', function (req, res) {
  var password = req.body.password
  var password2 = req.body.password2
  if (password === password2) {
    var newUser = new User({
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
// var LocalStrategy = require('passport-local').Strategy;
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
app.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    res.send(req.user)
  }
)

// Endpoint to get current user
app.get('/user', function (req, res) {
  res.send(req.user)
})

// Endpoint to logout
app.get('/logout', function (req, res) {
  req.logout()
  res.send(null)
})

// app.use('/', tripRoutes)

server.listen(PORT, () => {
  console.log(`Magic Happening on ${PORT}`)
})
