// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors());

// DB Connection
mongoose.connect("mongodb://localhost:27017/militarybank", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(" Mongo Error:", err));

// Schemas
const User = require("./models/User");
const Transaction = require("./models/Transaction");
const Notification = require("./models/Notification");

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/balance", require("./routes/balance"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/notifications", require("./routes/notifications"));

// Start server with WebSocket
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// WebSocket Chat
io.on("connection", (socket) => {
  console.log("🔵 New client connected:", socket.id);

  socket.on("chatMessage", (msg) => {
    console.log("💬 Chat:", msg);
    io.emit("chatMessage", msg); // broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

server.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
