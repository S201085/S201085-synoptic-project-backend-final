const mongoose = require('mongoose');

const { Schema } = mongoose;
const surveySchema = new Schema({
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

}, {
  timestamps: true,
});
module.exports = mongoose.models.Survey || mongoose.model('Survey', surveySchema);
