const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// Get all notifications for user (demo: no auth)
router.get("/", async (req, res) => {
  const notifs = await Notification.find().sort({ date: -1 }).limit(10);
  res.json(notifs);
});

// Mark notification as read
router.post("/read/:id", async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ success: true });
});

module.exports = router;
