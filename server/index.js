const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected with id: ${socket.id}`);

  socket.on("join-room", (room, game, username) => {
    console.log(room, game);
    socket.join(room);
    console.log(`User: ${username} joined room: ${room}, game ${game}`);
  });

  socket.on("add-number", (number, room) => {
    // console.log("room: ", room);
    // console.log(number + 1);
    socket.in(room).emit("updated-number", { number: number + 1 });
  });

  socket.on("subtract-number", (number, room) => {
    // console.log(number - 1);
    socket.in(room).emit("updated-number", { number: number - 1 });
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

server.listen(3003, () => console.log(`Server running on port 3003`));
