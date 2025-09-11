const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get balance for logged in user
router.get("/", async (req, res) => {
  const user = await User.findOne({ email: "demo@user.com" }); // demo, replace with auth
  res.json(user);
});

module.exports = router;
