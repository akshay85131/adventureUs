const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
const passport = require('passport')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')
const tripRoutes = require('./routes/route')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'Akshay13578111851171',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 500 }
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

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
    console.log('deeeeeeeeee' + id)
    done(err, user)
  })
})

var userSession
app.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    userSession = req.session.passport
    res.send(req.user)
  }
)

app.get('/user', function (req, res) {
  res.send(req.user)
})
// app.use('/', tripRoutes)

// Endpoint to logout
app.get('/logout', function (req, res) {
  req.logout()
  res.clearCookie('userData')
  res.send('user logout successfully')
  // res.send(null)
})

// app.use('/', passport.authenticate('local'), tripRoutes)

// function requireLogin (req, res, next) {
//   if (req.session.loggedIn) {
//     next()
//   } else {
//     // res.redirect("/login")
//   }
// }

// app.all('/trips/*', requireLogin, function (req, res, next) {
//   next() // if the middleware allowed us to get here,
//   // just move on to the next route handler
// })

// function authenticationMiddleware () {
//   return function (req, res, next) {
//     if (req.isAuthenticated()) {
//       return next()
//     }
//     res.redirect('/')
//   }
// }

const authenticationMiddleware = require('./control/middleWares/authMiddleware')
passport.authenticationMiddleware = authenticationMiddleware
// app.use('/trips/', tripRoutes)
app.use('/', passport.authenticationMiddleware(), tripRoutes)
// console.log('server' + session.user)

server.listen(PORT, () => {
  console.log(`Magic Happening on ${PORT}`)
})

module.exports = userSession
