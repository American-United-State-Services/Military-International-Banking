const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

router.get("/", async (req, res) => {
  const txs = await Transaction.find({ userId: "demo-user-id" }); // replace with auth
  res.json(txs);
});

module.exports = router;
