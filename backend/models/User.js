const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  checking: { type: Number, default: 0 },
  savings: { type: Number, default: 0 },
  checkingAccount: String,
  savingAccount: String,
  routing: String,
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);
