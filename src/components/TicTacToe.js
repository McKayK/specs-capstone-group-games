import React, { useEffect, useState } from "react";
import "./TicTacToe.css";
import Tile from "./Tile";

const TicTacToe = ({ game, socket, username, roomUsers, room }) => {
  const [playerChoice, setPlayerChoice] = useState("");
  const [winner, setWinner] = useState("");
  const [selection, setSelection] = useState("");
  const [turn, setTurn] = useState("X");

  const handleUserChoice = (event) => {
    setPlayerChoice(event.target.value);
    socket.emit("send-userChoice", {
      turn: turn,
      playerChoice: event.target.value,
    });
    document.getElementById(event.target.value).innerText = turn;
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
            id={verticalAxis[i] + horizontalAxis[x]}
            onClick={handleUserChoice}
            className="dark"
            key={verticalAxis[i] + horizontalAxis[x]}
          />
        );
      } else {
        tiles.push(
          <button
            value={verticalAxis[i] + horizontalAxis[x]}
            id={verticalAxis[i] + horizontalAxis[x]}
            onClick={handleUserChoice}
            className="light"
            key={verticalAxis[i] + horizontalAxis[x]}
          />
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

  socket.on("XorO", (data) => {
    console.log(data);
    if (data.player.value === "x") {
      setTurn("X");
    } else {
      setTurn("O");
    }
    setSelection(data.player);
  });

  socket.on("receive-choice", (data) => {
    document.getElementById(data.data.playerChoice).innerText = data.data.turn;

    console.log(data);
  });

  socket.on("winner", (winner) => {
    setWinner(winner.winner);
  });

  return (
    <div>
      <h1>Tic Tac Toe!</h1>
      {winner && <h2>Winner: {winner}!!!</h2>}
      <div id="board2">{tiles}</div>
      {selection && <h1>{selection.username}</h1>}
    </div>
  );
};

export default TicTacToe;
