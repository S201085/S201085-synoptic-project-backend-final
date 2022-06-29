const mongoose = require('mongoose');

const { Schema } = mongoose;
const speciesSchema = new Schema(
  {
    common_name: {
      type: String,
      trim: true,
      required: true,
    },
    latin_name: {
      type: String,
      trim: true,
      required: true,
    },
    // image: {
    //   type: String,
    //   trim: true,
    // },
    // description: {
    //   type: String,
    //   trim: true,
    // },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.models.Species || mongoose.model('Species', speciesSchema);
