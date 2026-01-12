const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  city: String,
  gender: String,
  dob: String,
  qualification: String
});

module.exports = mongoose.model("User", UserSchema);
