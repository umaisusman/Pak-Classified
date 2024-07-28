const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/user.route"));
app.use("/api/ads", require("./routes/ad.route"));
app.use("/api/statuses", require("./routes/status.route"));
app.use("/api/categories", require("./routes/category.route"));
app.use("/api/cities", require("./routes/city.route"));
app.use("/api/cityareas", require("./routes/cityArea.route"));
app.use("/api/countries", require("./routes/country.route"));
app.use("/api/provinces", require("./routes/province.route"));
app.use("/api/roles", require("./routes/role.route"));
app.use("/api/email", require("./routes/email.route"));
app.use("/api/comments", require("./routes/comment.route"));
app.use("/api/chat", require("./routes/chat.route"));
app.use("/api/message", require("./routes/message.route"));

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("sendMessage", (newMessage) => {
    const chat = newMessage;
    console.log('chat:', chat)
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === chat.latestMessage.sender._id) return;
      socket.in(user._id).emit("message", newMessage);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

const PORT = process.env.PORT || 4500;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
