const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const UserModel = require('../models/user')

// Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
  // passReqToCallback: true
}, async (email, password, done) => {
  try {
    console.log(email, password)
    const user = await UserModel.create({ email, password })
    console.log(user)
    return done(null, user)
  } catch (error) {
    // console.log(error)
    done(error)
  }
}))

// Create a passport middleware to handle User login
passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ email })
    console.log(user)
    if (!user) {
      return done(null, false, { message: 'User not found' })
    }
    const validate = await user.isValidPassword(password, user.password)
    if (!validate) { return done(null, false, { message: 'Wrong Password' }) }
    return done(null, user, { message: 'Logged in Successfully' })
  } catch (error) {
    console.log(error)
    return done(error)
  }
}))

const JWTstrategy = require('passport-jwt').Strategy
// We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt

// This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
  // secret we used to sign our JWT
  secretOrKey: 'top_secret',
  // we expect the user to send the token as a query paramater with the name 'secret_token'
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    // Pass the user details to the next middleware
    return done(null, token.user)
  } catch (error) {
    done(error)
  }
}))
