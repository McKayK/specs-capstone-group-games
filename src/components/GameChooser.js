import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import RockPaperScissors from "./RockPaperScissors";
import TicTacToe from "./TicTacToe";
import Checkers from "./Checkers";

const GameChooser = ({
  game,
  socket,
  username,
  roomUsers,
  room,
  setJoinedStatus,
  setGame,
}) => {
  const [readyToPlay, setReadyToPlay] = useState(false);

  const gameSelection = () => {
    if (game === "rps") {
      return (
        <RockPaperScissors
          game={game}
          socket={socket}
          username={username}
          roomUsers={roomUsers}
          room={room}
        />
      );
    } else if (game === "ttt") {
      return (
        <TicTacToe
          game={game}
          socket={socket}
          username={username}
          roomUsers={roomUsers}
          room={room}
        />
      );
    } else if (game === "checkers") {
      return (
        <Checkers
          game={game}
          socket={socket}
          username={username}
          roomUsers={roomUsers}
          room={room}
        />
      );
    }
  };

  const handleGame = (event) => {
    console.log(event.target.value);
    setGame(event.target.value);
    setReadyToPlay(true);
  };

  const handleBack = () => {
    const player = {
      name: username,
      room: room,
    };
    socket.emit("leave-game", player);
    setReadyToPlay(false);
    setGame("");
  };

  const handleHomeButton = () => {
    const player = {
      name: username,
      room: room,
    };
    socket.emit("leave-game", player);
    setJoinedStatus(false);
    setReadyToPlay(false);
    setGame("");
  };

  return (
    <div>
      {!readyToPlay ? (
        <div>
          <h3>Select a game</h3>
          <Button
            onClick={handleGame}
            value="rps"
            variant="contained"
            color="primary"
          >
            Rock Paper Scissors
          </Button>
          <Button
            onClick={handleGame}
            value="ttt"
            variant="contained"
            color="primary"
          >
            Tic Tac Toe
          </Button>
          <Button
            onClick={handleGame}
            value="checkers"
            variant="contained"
            color="primary"
          >
            Checkers
          </Button>
        </div>
      ) : (
        <div>
          {gameSelection()}
          <br />
          <br />
          <Button onClick={handleBack} variant="contained" color="primary">
            Back to game selector
          </Button>
          <Button
            onClick={handleHomeButton}
            variant="contained"
            color="primary"
          >
            Home
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameChooser;
