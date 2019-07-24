
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
UserSchema.pre('save', async (next) => {
  const user = this
  const hash = await bcrypt.hashSync(this.password, 10)
  this.password = hash
  next()
})
// checking for valid password
UserSchema.methods.isValidPassword = async (password) => {
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}
const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel
