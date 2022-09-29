const mongoose = require("mongoose");

const careersSchema = mongoose.Schema({
  fullName: {
    type: String,
  },
  designation: {
    type: String,
  },
  yearsOfExperience: {
    type: Number,
  },
  submitDate: {
    type: Date,
  },
  resume: {
    type: String,
  },
  resumeImage: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("career", careersSchema);
