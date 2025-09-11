const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: Date.now },
  description: String,
  amount: Number,
  type: String // Deposit, Withdraw, Transfer, Wire, etc.
});

module.exports = mongoose.model("Transaction", transactionSchema);