const mongoose = require("mongoose");

const vacationsSchema = mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
  },
  employeeName: {
    type: String,
  },
  type: {
    type: String,
  },
  startDate: {
    type: Date,
    default: null,
  },
  endDate: {
    type: Date,
    default: null,
  },
  numberOfHours: {
    type: String,
    default: null,
  },
  numberOfDays: {
    type: String,
    default: null,
  },

  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("vacation", vacationsSchema);
