const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const adminSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// Compares given password by generating hash and comparing to Mongo
adminSchema.methods.verifyPassword = (pwd, adminPwd) => bcrypt.compareSync(pwd, adminPwd);
module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
