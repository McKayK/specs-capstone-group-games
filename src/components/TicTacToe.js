import React, { useEffect, useState } from "react";
import "./TicTacToe.css";

const TicTacToe = ({ game, socket, username, roomUsers, room }) => {
  const [playerChoice, setPlayerChoice] = useState("");

  const handleUserChoice = (event) => {
    setPlayerChoice(event.target.value);
    console.log("hit");
  };

  const verticalAxis = [1, 2, 3];
  const horizontalAxis = ["a", "b", "c"];

  let tiles = [];

  for (let i = 0; i < verticalAxis.length; i++) {
    for (let x = 0; x < horizontalAxis.length; x++) {
      const number = i + x + 2;

      if (number % 2 === 0) {
        tiles.push(
          <button
            value={verticalAxis[i] + horizontalAxis[x]}
            onClick={handleUserChoice}
            className="dark"
            key={verticalAxis[i] + horizontalAxis[x]}
          ></button>
        );
      } else {
        tiles.push(
          <button
            value={verticalAxis[i] + horizontalAxis[x]}
            onClick={handleUserChoice}
            className="light"
            key={verticalAxis[i] + horizontalAxis[x]}
          ></button>
        );
      }
    }
  }

  //sockets
  useEffect(() => {
    const player = {
      name: username,
      room: room,
      selection: playerChoice,
    };
    socket.emit("tic-choice", player);
  }, [playerChoice]);

  return (
    <div>
      <h1>Tic Tac Toe!</h1>
      <div id="board2">{tiles}</div>
    </div>
  );
};

export default TicTacToe;
