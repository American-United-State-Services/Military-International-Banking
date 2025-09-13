const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Deposit
router.post("/deposit", async (req, res) => {
  const { accountNumber, routing, amount, type } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ checkingAccount: accountNumber }, { savingAccount: accountNumber }],
      routing
    });

    if (!user) return res.status(404).json({ error: "Account not found" });

    if (type === "checking") user.checking += amount;
    else if (type === "savings") user.savings += amount;

    await user.save();
    res.json({ success: true, balance: { checking: user.checking, savings: user.savings } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Withdraw
router.post("/withdraw", async (req, res) => {
  const { accountNumber, routing, amount, type } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ checkingAccount: accountNumber }, { savingAccount: accountNumber }],
      routing
    });

    if (!user) return res.status(404).json({ error: "Account not found" });

    if (type === "checking") {
      if (user.checking < amount) return res.status(400).json({ error: "Insufficient funds" });
      user.checking -= amount;
    } else if (type === "savings") {
      if (user.savings < amount) return res.status(400).json({ error: "Insufficient funds" });
      user.savings -= amount;
    }

    await user.save();
    res.json({ success: true, balance: { checking: user.checking, savings: user.savings } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
