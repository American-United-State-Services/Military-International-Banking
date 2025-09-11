const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Notification = require("../models/Notification");

// Admin deposits money
router.post("/deposit", async (req, res) => {
  const { userId, amount } = req.body;
  const user = await User.findById(userId);
  user.checking += amount;
  await user.save();

  await Transaction.create({ userId, description: "Admin Deposit", amount, type: "Deposit" });
  await Notification.create({ userId, message: `Deposit of $${amount} successful` });

  res.json({ success: true, newBalance: user.checking });
});

module.exports = router;
