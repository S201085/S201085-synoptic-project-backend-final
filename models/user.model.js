const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    default: '',
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    default: '',
  },
  password: {
    type: String,
    required: true,
    default: '',
  },

  // isDeleted: {
  //   type: Boolean,
  //   required: true,
  //   default: false,
  // },

});
// Compares given password by generating hash and comparing to Mongo
userSchema.methods.verifyPassword = (password, userPwd) => bcrypt.compareSync(password, userPwd);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
