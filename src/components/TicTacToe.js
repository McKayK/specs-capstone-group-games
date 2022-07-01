import React, { useEffect, useState } from "react";
import "./TicTacToe.css";
import Button from "@mui/material/Button";

const TicTacToe = ({ game, socket, username, roomUsers, room }) => {
  const [playerChoice, setPlayerChoice] = useState("");
  const [winner, setWinner] = useState("");
  const [selection, setSelection] = useState("");
  const [matchup, setMatchup] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  useEffect(() => {
    const player = {
      name: username,
      room: room,
      selection: playerChoice,
    };
    socket.emit("tic-choice", player);
  }, [playerChoice]);

  const newGame = () => {
    const handleUserChoice = (event) => {
      event.preventDefault();
      setPlayerChoice(event.target.value);
    };

    let tiles = [];

    const verticalAxis = [1, 2, 3];
    const horizontalAxis = ["a", "b", "c"];

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
    socket.on("XorO", (data) => {
      console.log(data);
      setSelection(data.player);
      document.getElementById(data.player.playerChoice).innerText =
        data.player.value;
    });

    socket.on("get-matchup", (matchup) => {
      const players = matchup.matchup.split(" vs. ");
      setPlayer1(players[0]);
      setPlayer2(players[1]);
      setMatchup(matchup.matchup);
    });

    socket.on("winner", (winner) => {
      setWinner(winner.winner);
    });

    return tiles;
  };

  useEffect(() => {
    if (winner) {
      if (winner === player1) {
        console.log("player 1 wins", winner);
        setPlayer1Score(player1Score + 1);
      } else if (winner === player2) {
        setPlayer2Score(player2Score + 1);
      }
    }
  }, [winner]);

  const handleNextGame = () => {
    const test = document.getElementById("board2");
    const buttons = test.querySelectorAll("button");
    console.log(buttons);
    buttons.forEach((elem) => {
      elem.innerHTML = "";
    });
    setWinner("");
    newGame();
  };

  return (
    <div>
      <h1>Tic Tac Toe!</h1>
      {matchup && <h1>Current Match: {matchup}</h1>}
      {matchup && (
        <div>
          <h3>{player1}</h3>
          <h4>{player1Score}</h4>
          <h3>{player2}</h3>
          <h4>{player2Score}</h4>
        </div>
      )}
      {winner && <h2>Winner: {winner}!!!</h2>}
      <div id="board2">{newGame()}</div>
      <br />
      {winner && (
        <Button onClick={handleNextGame} variant="contained" color="primary">
          Next Game
        </Button>
      )}
    </div>
  );
};

export default TicTacToe;
