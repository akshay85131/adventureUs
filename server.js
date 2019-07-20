const express = require('express')
const bodyParser = require('body-parser')
const tripRoutes = require('./routes/route')
const app = express()
var moment = require('moment.js')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const LocalStrategy = require('passport-local').Strategy
const PORT = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// var index = require('./routes/index')
// var users = require('./routes/users')
// app.use(cookieParser())
// app.use(require('express-session'))({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false
// })
// app.use(passport.initialize())
// app.use(passport.session())

// app.use('/', index);
// app.use('/users', users);
// const User =require('./models/user')
// passport.use(new LocalStrategy(User.authenticate()))
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
// })
app.use('/', tripRoutes)

app.listen(PORT, () => {
  console.log(`Magic Happening on ${PORT}`)
})
