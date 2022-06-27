const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { Socket } = require("dgram");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

class Players {
  constructor(id, username, room, game, playerChoice, joinPosition) {
    this.id = id;
    this.username = username;
    this.room = room;
    this.game = game;
    this.playerChoice = playerChoice;
    this.joinPosition = joinPosition;
  }
}

const players = [];

io.on("connection", (socket) => {
  console.log(`User connected with id: ${socket.id}`);

  socket.on("join-room", (room, game, username) => {
    console.log(room, game);
    socket.join(room);
    players.push(
      new Players(
        socket.id,
        username,
        room,
        game,
        "",
        players.filter((e) => e.room === room).length + 1
      )
    );

    console.log(`User: ${username} joined room: ${room}, game ${game}`);
  });

  //Rock Paper Scissors
  socket.on("player-choice", (data) => {
    let winner;
    const player = players.filter((e) => e.id === socket.id)[0];

    player.playerChoice = data.selection;
    const game = players.filter((e) => e.room === player.room);

    if (game.length > 1) {
      if (game[0].playerChoice !== "" && game[1].playerChoice !== "") {
        if (game[0].playerChoice === game[1].playerChoice) {
          winner = "Tie";
        } else if (
          game[0].playerChoice === "rock" &&
          game[1].playerChoice === "paper"
        ) {
          winner = game[1].username;
        } else if (
          game[0].playerChoice === "rock" &&
          game[1].playerChoice === "scissors"
        ) {
          winner = game[0].username;
        } else if (
          game[0].playerChoice === "paper" &&
          game[1].playerChoice === "scissors"
        ) {
          winner = game[1].username;
        } else if (
          game[0].playerChoice === "paper" &&
          game[1].playerChoice === "rock"
        ) {
          winner = game[0].username;
        } else if (
          game[0].playerChoice === "scissors" &&
          game[1].playerChoice === "rock"
        ) {
          winner = game[1].username;
        } else if (
          game[0].playerChoice === "scissors" &&
          game[1].playerChoice === "paper"
        ) {
          winner = game[0].username;
        }
        game[0].playerChoice = "";
        game[1].playerChoice = "";
        // io.sockets.to(data.room).emit("check-winner", { winner: winner });
        io.sockets.in(data.room).emit("check-winner", { winner: winner });
      }
    }
    console.log(game);
  });

  //Tic Tac Toe
  const top = [];
  const middle = [];
  const bottom = [];
  const diagonalLeft = [];
  const diagonalRight = [];

  socket.on("tic-choice", (data) => {
    const player = players.filter((e) => e.id === socket.id)[0];

    player.playerChoice = data.selection;
    const game = players.filter((e) => e.room === player.room);

    let turn = game[0].username;

    if (data.selection.includes("1a")) {
      top.push(turn);
      diagonalLeft.push(turn);
    } else if (data.selection.includes("1b")) {
      top.push(turn);
    } else if (data.selection.includes("1c")) {
      top.push(turn);
      diagonalRight.push(turn);
    } else if (data.selection.includes("2a")) {
      middle.push(turn);
    } else if (data.selection.includes("2b")) {
      middle.push(turn);
      diagonalLeft.push(turn);
      diagonalRight.push(turn);
    } else if (data.selection.includes("2c")) {
      middle.push(turn);
    } else if (data.selection.includes("3a")) {
      bottom.push(turn);
      diagonalRight.push(turn);
    } else if (data.selection.includes("3b")) {
      bottom.push(turn);
    } else if (data.selection.includes("3c")) {
      bottom.push(turn);
      diagonalLeft.push(turn);
    }

    console.log(
      "top: ",
      top,
      "middle: ",
      middle,
      "bottom: ",
      bottom,
      "diagonal left: ",
      diagonalLeft,
      "diagonal right: ",
      diagonalRight
    );
  });

  socket.on("disconnect", () => {
    const index = players.findIndex((user) => {
      return user.id === socket.id;
    });
    if (index !== -1) {
      players.splice(index, 1);
    }
    console.log(`${socket.id} disconnected`);
  });
});

server.listen(3003, () => console.log(`Server running on port 3003`));
