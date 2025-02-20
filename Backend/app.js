const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const DbConnectionFunction = require("./db/dbconfig");
const MessageRoute = require("./routes/message.route");
const AuthRoute = require("./routes/auth.route");
const path = require("path");

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());

// Connect to database
DbConnectionFunction();

// Routes
app.use("/api/auth", AuthRoute);
app.use("/api/message", MessageRoute);

// ✅ Use `__dirname` Directly in CommonJS
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../Frontend/dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Track online users
const onlineUsers = {};

io.on("connection", (socket) => {
  socket.on("user_connected", ({ userId, socketId }) => {
    onlineUsers[userId] = socketId;
    io.emit("update_online_users", onlineUsers);
  });

  socket.on("disconnect", () => {
    const disconnectedUser = Object.keys(onlineUsers).find(
      (userId) => onlineUsers[userId] === socket.id
    );

    if (disconnectedUser) {
      delete onlineUsers[disconnectedUser];
      io.emit("update_online_users", onlineUsers);
    }
  });

  socket.on("send_message", async ({ senderId, receiverId, message }) => {
    if (onlineUsers[receiverId]) {
      io.to(onlineUsers[receiverId]).emit("receive_message", { senderId, message });
    }
  });

  socket.on("get_online_users", () => {
    socket.emit("online_users", onlineUsers);
  });

  socket.emit("online_users", onlineUsers);
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ The App Is Running on Port ${PORT}`);
});
