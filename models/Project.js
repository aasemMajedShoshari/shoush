const mongoose = require("mongoose");

const projectsSchema = mongoose.Schema({
  projectNameAR: {
    type: String,
  },
  projectNameEn: {
    type: String,
  },
  projectLocation: {
    type: "String",
  },
});

module.exports = mongoose.model("project", projectsSchema);
