
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

  if (!user.isModified('password')) return next()
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})


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
