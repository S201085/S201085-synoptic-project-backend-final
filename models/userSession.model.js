const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSessionSchema = new Schema({
  userId: {
    type: Number,
    trim: true,
    default: -1,
  },
  timestamp: {
    type: Date,
    trim: true,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

});

module.exports = mongoose.models.UserSession || mongoose.model('UserSession', userSessionSchema);
