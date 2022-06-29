const mongoose = require('mongoose');

const { Schema } = mongoose;
const sightingSchema = new Schema({
  userId: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
  },
  sightingType: {
    type: String,
    trim: true,
    required: true,
    enum: ['single', 'survey'],
  },
  surveyId: {
    type: String,
    trim: true,
  },
  species: {
    type: String,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  longitude: {
    type: Number,
    trim: true,
  },
  latitude: {
    type: Number,
    trim: true,
    required: true,
  },
  visibility: {
    type: String,
    trim: true,
    required: true,
  },
  freedom: {
    type: String,
    trim: true,
    required: true,
  },
  sightingDateTime: {
    type: Date,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});
module.exports = mongoose.models.Sighting || mongoose.model('Sighting', sightingSchema);
