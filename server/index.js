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

class Players {
  constructor(id, username, room, game, playerChoice, joinPosition) {
    this.id = id;
    this.username = username;
    this.room = room;
    this.game = game;
    this.playerChoice = playerChoice;
    this.joinPosition = joinPosition;
    this.turn = true;
    this.value = "";
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

  //Player leaves a game
  socket.on("leave-game", (data) => {
    console.log(data);
  });

  //Rock Paper Scissors
  socket.on("player-choice", (data) => {
    let winner;
    const player = players.filter((e) => e.id === socket.id)[0];

    player.playerChoice = data.selection;
    const game = players.filter((e) => e.room === player.room);

    console.log("GAME: ", game);

    //Player leaves a game
    socket.on("leave-game", (data) => {
      const index = game.findIndex((elem) => {
        return elem.username === data.name;
      });

      if (index !== -1) {
        game.splice(index, 1);
      }

      console.log(`Player ${data.name} left the game`);
      console.log(game);
    });

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
  });

  //Tic Tac Toe
  let top = [];
  let middle = [];
  let bottom = [];
  let leftCol = [];
  let middleCol = [];
  let rightCol = [];
  let diagonalLeft = [];
  let diagonalRight = [];

  socket.on("tic-choice", (data) => {
    const player = players.filter((e) => e.id === socket.id)[0];

    player.playerChoice = data.selection;
    const game = players.filter((e) => e.room === player.room);

    // console.log("GAME: ", game);

    //Player leaves a game
    socket.on("leave-game", (data) => {
      const index = game.findIndex((elem) => {
        return elem.username === data.name;
      });

      if (index !== -1) {
        game.splice(index, 1);
      }

      console.log(`Player ${data.name} left the game`);
      console.log(game);
    });

    socket.on("send-userChoice", (test) => {
      io.sockets.in(data.room).emit("receive-choice", { data: test });
    });

    if (game.length >= 2) {
      if (game[0].turn && game[1].turn) {
        game[0].turn = true;
        game[0].value = "x";
        game[1].turn = false;
        game[1].value = "o";
      }
    }

    const turnChanger = () => {
      if (game[0].turn) {
        game[1].turn = true;
        game[0].turn = false;
      } else if (game[1].turn) {
        game[0].turn = true;
        game[1].turn = false;
      }
    };

    if (game.length >= 2) {
      // const playerTurn = game[0].turn ? game[0].username : game[1].username;
      const playerTurn = game[0].turn ? game[0] : game[1];
      console.log("hit: ", data.name);
      if (data.name === playerTurn.username) {
        if (data.selection.includes("1a")) {
          top.push(playerTurn.username);
          leftCol.push(playerTurn.username);
          diagonalLeft.push(playerTurn.username);
          turnChanger();
          //sends user and which cell they choose
          io.sockets
            .in(data.room)
            .emit("XorO", { selection: data.selection, player: playerTurn });
        } else if (data.selection.includes("1b")) {
          top.push(playerTurn.username);
          middleCol.push(playerTurn.username);
          turnChanger();
          io.sockets
            .in(data.room)
            .emit("XorO", { selection: data.selection, player: playerTurn });
        } else if (data.selection.includes("1c")) {
          top.push(playerTurn.username);
          rightCol.push(playerTurn.username);
          diagonalRight.push(playerTurn.username);
          turnChanger();
          io.sockets
            .in(data.room)
            .emit("XorO", { selection: data.selection, player: playerTurn });
        } else if (data.selection.includes("2a")) {
          middle.push(playerTurn.username);
          leftCol.push(playerTurn.username);
          turnChanger();
          io.sockets
            .in(data.room)
            .emit("XorO", { selection: data.selection, player: playerTurn });
        } else if (data.selection.includes("2b")) {
          middle.push(playerTurn.username);
          middleCol.push(playerTurn.username);
          diagonalLeft.push(playerTurn.username);
          diagonalRight.push(playerTurn.username);
          turnChanger();
          io.sockets
            .in(data.room)
            .emit("XorO", { selection: data.selection, player: playerTurn });
        } else if (data.selection.includes("2c")) {
          middle.push(playerTurn.username);
          rightCol.push(playerTurn.username);
          turnChanger();
          io.sockets
            .in(data.room)
            .emit("XorO", { selection: data.selection, player: playerTurn });
        } else if (data.selection.includes("3a")) {
          bottom.push(playerTurn.username);
          leftCol.push(playerTurn.username);
          diagonalRight.push(playerTurn.username);
          turnChanger();
          io.sockets
            .in(data.room)
            .emit("XorO", { selection: data.selection, player: playerTurn });
        } else if (data.selection.includes("3b")) {
          bottom.push(playerTurn.username);
          middleCol.push(playerTurn.username);
          turnChanger();
          io.sockets
            .in(data.room)
            .emit("XorO", { selection: data.selection, player: playerTurn });
        } else if (data.selection.includes("3c")) {
          bottom.push(playerTurn.username);
          rightCol.push(playerTurn.username);
          diagonalLeft.push(playerTurn.username);
          turnChanger();
          io.sockets
            .in(data.room)
            .emit("XorO", { selection: data.selection, player: playerTurn });
        }
      }
    }

    const checkWinner = (arr) =>
      arr.every((elem) => elem === arr[0] && arr.length === 3);

    let winner;

    if (checkWinner(top)) {
      winner = top[0];
    } else if (checkWinner(middle)) {
      winner = middle[0];
    } else if (checkWinner(bottom)) {
      winner = bottom[0];
    } else if (checkWinner(leftCol)) {
      winner = leftCol[0];
    } else if (checkWinner(middleCol)) {
      winner = middleCol[0];
    } else if (checkWinner(rightCol)) {
      winner = rightCol[0];
    } else if (checkWinner(diagonalLeft)) {
      winner = diagonalLeft[0];
    } else if (checkWinner(diagonalRight)) {
      winner = diagonalRight[0];
    }

    //send winner to front end

    if (winner) {
      io.sockets.in(data.room).emit("winner", { winner: winner });
    }

    //   console.log(
    //     "top: ",
    //     top,
    //     "middle: ",
    //     middle,
    //     "bottom: ",
    //     bottom,
    //     "left column: ",
    //     leftCol,
    //     "middle column: ",
    //     middleCol,
    //     "right column: ",
    //     rightCol,
    //     "diagonal left: ",
    //     diagonalLeft,
    //     "diagonal right: ",
    //     diagonalRight
    //   );
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
