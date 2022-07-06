import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import RockPaperScissors from "./RockPaperScissors";
import TicTacToe from "./TicTacToe";
import Farkle from "./Farkle";
import "./GameChooser.css";
import Chat from "./Chat";

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
  const [show, setShow] = useState(false);

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
    } else if (game === "farkle") {
      return (
        <Farkle
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
    console.log(event);
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

  const changeShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <div className="main-background">
      {!readyToPlay ? (
        <div className="main-background">
          <h3 className="heading">Select a game</h3>
          <div className="games">
            <button
              className="game-btn"
              onClick={handleGame}
              value="rps"
              style={{
                backgroundImage: "url(images/rockpaperscissors.png)",
                borderRadius: "50px",
              }}
            ></button>
            {/* <Button
            onClick={handleGame}
            value="rps"
            variant="contained"
            color="primary"
          >
            Rock Paper Scissors
          </Button> */}
            <button
              className="game-btn"
              onClick={handleGame}
              value="ttt"
              style={{
                backgroundImage: "url(images/tictactoe.png)",
                borderRadius: "50px",
              }}
            ></button>
            {/* <Button
            onClick={handleGame}
            value="ttt"
            variant="contained"
            color="primary"
          >
            Tic Tac Toe
          </Button> */}
            <button
              className="game-btn"
              onClick={handleGame}
              value="farkle"
              style={{
                backgroundImage: "url(images/farkle.png)",
                borderRadius: "50px",
              }}
            ></button>
            {/* <Button
            onClick={handleGame}
            value="farkle"
            variant="contained"
            color="primary"
          >
            Farkle
          </Button> */}
          </div>
        </div>
      ) : (
        <div className="main-background">
          {gameSelection()}
          {show && <Chat socket={socket} room={room} username={username} />}

          <br />
          <br />
          <div className="back-buttons">
            <button className="neon button" onClick={handleBack}>
              Back to game selector
            </button>
            {/* <Button onClick={handleBack} variant="contained" color="primary">
              Back to game selector
            </Button> */}
            <button className="neon button" onClick={handleHomeButton}>
              Home
            </button>
            <button onClick={changeShow} className="neon button" id="show-chat">
              Chat
            </button>
            {/* <Button
              onClick={handleHomeButton}
              variant="contained"
              color="primary"
            >
              Home
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameChooser;
