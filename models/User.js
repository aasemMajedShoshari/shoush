const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("user", usersSchema);
