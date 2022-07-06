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
    this.rollStatus = true;
    this.dice = this.value = "";
    this.score = 0;
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

  //chat
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
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
      // console.log(game);
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
        console.log(winner);
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
      // console.log(game);
    });

    if (game.length >= 2) {
      io.sockets.in(data.room).emit("get-matchup", {
        matchup: `${game[0].username.toUpperCase()} vs. ${game[1].username.toUpperCase()}`,
      });
    }

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
      const playerTurn = game[0].turn ? game[0] : game[1];
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
          io.sockets.in(data.room).emit("XorO", {
            selection: data.selection,
            player: playerTurn,
          });
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

    // socket.on("leave-game", (data) => {
    //   const index = game.findIndex((elem) => {
    //     return elem.username === data.name;
    //   });

    // if (!winner) {
    //   const loser = [game[0], game[1]].findIndex((elem) => {
    //     return elem.username !== winner;
    //   });
    //   const player = game.splice(loser, 1);
    //   game.push(player);
    //   console.log(game);
    // }

    //send winner to front end
    if (winner) {
      console.log(winner);
      io.sockets.in(data.room).emit("winner", { winner: winner });
      top = [];
      middle = [];
      bottom = [];
      leftCol = [];
      middleCol = [];
      rightCol = [];
      diagonalLeft = [];
      diagonalRight = [];
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

  //Farkle
  socket.on("farkle-player", (data) => {
    // const player = players.filter((e) => e.id === socket.id)[0];
    // player.playerChoice = data.selection;
    // const game = players.filter((e) => e.room === player.room);
    // console.log(data);
  });

  socket.on("start-game", (data) => {
    const player = players.filter((e) => e.id === socket.id)[0];

    // player.playerChoice = data.selection;
    const game = players.filter((e) => e.room === player.room);

    io.sockets.in(data.room).emit("players", game);

    const index = game.findIndex((user) => {
      return user.username === data.name;
    });
    // const index = players.findIndex((user) => {
    //   return user.username === data.name;
    // });

    if (game.length >= 2) {
      if (game[0].turn && game[1].turn) {
        game[0].turn = true;
        game[1].turn = false;
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

    const playerTurn = game[0].turn ? game[0] : game[1];

    if (data.stayStatus) {
      // const index2 = game.findIndex((elem) => {
      //   return elem.username === data.name;
      // });
      if (game[index] && playerTurn.username === data.name) {
        let score = 0;
        const die1 = +data.stay[0].split(".png")[0];
        const die2 = +data.stay[1].split(".png")[0];
        const die3 = +data.stay[2].split(".png")[0];
        const die4 = +data.stay[3].split(".png")[0];
        const die5 = +data.stay[4].split(".png")[0];
        const die6 = +data.stay[5].split(".png")[0];

        let threePairs = [];
        let fourAndPair = [];
        let triplets = [];

        let ones = [];
        let twos = [];
        let threes = [];
        let fours = [];
        let fives = [];
        let sixes = [];

        if (die1 === 1) {
          ones.push(die1);
        } else if (die1 === 2) {
          twos.push(die1);
        } else if (die1 === 3) {
          threes.push(die1);
        } else if (die1 === 4) {
          fours.push(die1);
        } else if (die1 === 5) {
          fives.push(die1);
        } else if (die1 === 6) {
          sixes.push(die1);
        }

        if (die2 === 1) {
          ones.push(die2);
        } else if (die2 === 2) {
          twos.push(die2);
        } else if (die2 === 3) {
          threes.push(die2);
        } else if (die2 === 4) {
          fours.push(die2);
        } else if (die2 === 5) {
          fives.push(die2);
        } else if (die2 === 6) {
          sixes.push(die2);
        }

        if (die3 === 1) {
          ones.push(die3);
        } else if (die3 === 2) {
          twos.push(die3);
        } else if (die3 === 3) {
          threes.push(die3);
        } else if (die3 === 4) {
          fours.push(die3);
        } else if (die3 === 5) {
          fives.push(die3);
        } else if (die3 === 6) {
          sixes.push(die3);
        }

        if (die4 === 1) {
          ones.push(die4);
        } else if (die4 === 2) {
          twos.push(die4);
        } else if (die4 === 3) {
          threes.push(die4);
        } else if (die4 === 4) {
          fours.push(die4);
        } else if (die4 === 5) {
          fives.push(die4);
        } else if (die4 === 6) {
          sixes.push(die4);
        }

        if (die5 === 1) {
          ones.push(die5);
        } else if (die5 === 2) {
          twos.push(die5);
        } else if (die5 === 3) {
          threes.push(die5);
        } else if (die5 === 4) {
          fours.push(die5);
        } else if (die5 === 5) {
          fives.push(die5);
        } else if (die5 === 6) {
          sixes.push(die5);
        }

        if (die6 === 1) {
          ones.push(die6);
        } else if (die6 === 2) {
          twos.push(die6);
        } else if (die6 === 3) {
          threes.push(die6);
        } else if (die6 === 4) {
          fours.push(die6);
        } else if (die6 === 5) {
          fives.push(die6);
        } else if (die6 === 6) {
          sixes.push(die6);
        }

        //ones logic
        if (ones.length === 6) {
          score += 3000;
          ones = [];
        } else if (ones.length === 5) {
          score += 2000;
          ones = [];
        } else if (ones.length === 4) {
          fourAndPair.push(ones);
          score += 1000;
          ones = [];
        } else if (ones.length === 3) {
          triplets.push(ones);
          score += 300;
          ones = [];
        } else if (ones.length === 2) {
          threePairs.push(ones);
          fourAndPair.push(ones);
          score += 200;
          ones = [];
        } else if (ones.length === 1) {
          score += 100;
          ones = [];
        }

        //twos logic
        if (twos.length === 6) {
          score += 3000;
          twos = [];
        } else if (twos.length === 5) {
          score += 2000;
          twos = [];
        } else if (twos.length === 4) {
          fourAndPair.push(twos);
          score += 1000;
          twos = [];
        } else if (twos.length === 3) {
          triplets.push(twos);
          score += 200;
          twos = [];
        } else if (twos.length === 2) {
          threePairs.push(twos);
          fourAndPair.push(twos);
          twos = [];
        }

        //threes logic
        if (threes.length === 6) {
          score += 3000;
          threes = [];
        } else if (threes.length === 5) {
          score += 2000;
          threes = [];
        } else if (threes.length === 4) {
          fourAndPair.push(threes);
          score += 1000;
          threes = [];
        } else if (threes.length === 3) {
          triplets.push(threes);
          score += 300;
          threes = [];
        } else if (threes.length === 2) {
          threePairs.push(threes);
          fourAndPair.push(threes);
          threes = [];
        }

        //fours logic
        if (fours.length === 6) {
          score += 3000;
          fours = [];
        } else if (fours.length === 5) {
          score += 2000;
          fours = [];
        } else if (fours.length === 4) {
          fourAndPair.push(fours);
          score += 1000;
          fours = [];
        } else if (fours.length === 3) {
          triplets.push(fours);
          score += 400;
          fours = [];
        } else if (fours.length === 2) {
          threePairs.push(fours);
          fourAndPair.push(fours);
          fours = [];
        }

        //fives logic
        if (fives.length === 6) {
          score += 3000;
          fives = [];
        } else if (fives.length === 5) {
          score += 2000;
          fives = [];
        } else if (fives.length === 4) {
          fourAndPair.push(fives);
          score += 1000;
          fives = [];
        } else if (fives.length === 3) {
          triplets.push(fives);
          score += 500;
          fives = [];
        } else if (fives.length === 2) {
          threePairs.push(fives);
          fourAndPair.push(fives);
          score += 100;
          fives = [];
        } else if (fives.length === 1) {
          score += 50;
          fives = [];
        }

        //sixes logic
        if (sixes.length === 6) {
          score += 3000;
          sixes = [];
        } else if (sixes.length === 5) {
          score += 2000;
          sixes = [];
        } else if (sixes.length === 4) {
          fourAndPair.push(sixes);
          score += 1000;
          sixes = [];
        } else if (sixes.length === 3) {
          triplets.push(sixes);
          score += 600;
          sixes = [];
        } else if (sixes.length === 2) {
          threePairs.push(sixes);
          fourAndPair.push(sixes);
          sixes = [];
        }

        //straight logic
        if (
          ones.length === 1 &&
          twos.length === 1 &&
          threes.length === 1 &&
          fours.length === 1 &&
          fives.length === 1 &&
          sixes.length === 1
        ) {
          score += 1500;
        }

        //three pairs logic
        if (threePairs.length === 3) {
          score += 1500;
        }

        //Four of a kind and a pair
        if (fourAndPair.length === 2) {
          if (fourAndPair[0].length === 4 || fourAndPair[1].length === 4) {
            score += 1500;
          }
        }

        //Triplets
        if (triplets.length === 2) {
          score += 2500;
        }

        // console.log(
        //   "ones: ",
        //   ones,
        //   "twos: ",
        //   twos,
        //   "threes: ",
        //   threes,
        //   "fours: ",
        //   fours,
        //   "fives: ",
        //   fives,
        //   "sixes: ",
        //   sixes,
        //   "four and a pair: ",
        //   fourAndPair
        // );
        game[index].score += score;
        // console.log("game at index: ", game[index2]);
        console.log("hit");
        turnChanger();

        io.sockets.in(data.room).emit("calculate-score", game[index]);
      }
    }

    const diceArray = [
      `${Math.floor(Math.random() * 6 + 1)}.png`,
      `${Math.floor(Math.random() * 6 + 1)}.png`,
      `${Math.floor(Math.random() * 6 + 1)}.png`,
      `${Math.floor(Math.random() * 6 + 1)}.png`,
      `${Math.floor(Math.random() * 6 + 1)}.png`,
      `${Math.floor(Math.random() * 6 + 1)}.png`,
    ];

    const playerKeep = data.keep.split(",");

    let one;
    let two;
    let three;
    let four;
    let five;
    let six;

    if (playerKeep[0]) {
      one = playerKeep[0].split(" ");
      diceArray.splice(0, 1, `${one[1]}.png`);
    }
    if (playerKeep[1]) {
      two = playerKeep[1].split(" ");
      diceArray.splice(1, 1, `${two[1]}.png`);
    }
    if (playerKeep[2]) {
      three = playerKeep[2].split(" ");
      diceArray.splice(2, 1, `${three[1]}.png`);
    }
    if (playerKeep[3]) {
      four = playerKeep[3].split(" ");
      diceArray.splice(3, 1, `${four[1]}.png`);
    }
    if (playerKeep[4]) {
      five = playerKeep[4].split(" ");
      diceArray.splice(4, 1, `${five[1]}.png`);
    }
    if (playerKeep[5]) {
      six = playerKeep[5].split(" ");
      diceArray.splice(5, 1, `${six[1]}.png`);
    }

    console.log(data);
    if (data.roll && game[index]) {
      game[index].dice = diceArray;

      console.log(game[index]);

      io.sockets.in(data.room).emit("roll", game[index]);
    }
    // game[index].rollStatus = false;

    // io.sockets.in(data.room).emit("get-players", { players: game });
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
