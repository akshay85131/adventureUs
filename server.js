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
const RedisStore = require('connect-redis')(session)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    prefix: 'sess'
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
    done(err, user)
  })
})

// var userSession
app.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    console.log(req.session)
    res.send(req.user)
  }
)

// Endpoint to logout
app.get('/logout', function (req, res) {
  req.logout()
  res.clearCookie('user_sid')
  res.send('user logout successfully')
  // res.send(null)
})

// const isLoggedIn = (req, res, next) => {
//   // if (req.isAuthenticated()) {
//   if (req.headers.cookie === req.sesscion.key['user_sid']) {
//     console.log('inside' + req.isAuthentcated())
//     return next()
//   }
//   console.log(req.session.passport.user)
//   // console.log(req.cookies)
//   console.log(req.isAuthenticated())

//   res.send('loggin first DUmpppp')
// }

app.use('/trips', tripRoutes)

server.listen(PORT, () => {
  console.log(`Magic Happening on ${PORT}`)
})
