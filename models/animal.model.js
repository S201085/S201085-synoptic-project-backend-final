const mongoose = require('mongoose');

const { Schema } = mongoose;
const animalSchema = new Schema({
  species: {
    type: String,
    trim: true,
    required: true,
  },
  latinName: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
    type: String,
    trim: true,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
}, {
  timestamps: true,
});
module.exports = mongoose.models.Animal || mongoose.model('Animal', animalSchema);
