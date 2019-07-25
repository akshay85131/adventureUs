
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})
UserSchema.pre('save', function (next) {
  var user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})
// UserSchema.methods.isValidPassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err)
//     cb(null, isMatch)
//   })
// }

// checking for valid password
UserSchema.methods.isValidPassword = async (nePassword, password) => {
  // const user = this
  // console.log('auth=======>' + password)

  const compare = await bcrypt.compare(nePassword, password)
  console.log(compare)
  return compare
}
const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel
