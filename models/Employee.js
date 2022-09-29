const mongoose = require("mongoose");

const emoployeesSchema = mongoose.Schema({
  accountNumber: {
    type: String,
  },
  nameAR: {
    type: String,
  },
  nameEN: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  designation: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  city: {
    type: String,
  },
  isManager: {
    type: Boolean,
  },
  hireDate: {
    type: Date,
  },
  birthDate: {
    type: Date,
  },
  managerId: {
    type: String,
  },
});

module.exports = mongoose.model("employee", emoployeesSchema);
