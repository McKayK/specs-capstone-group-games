import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const RockPaperScissors = ({ username, roomUsers, room, socket, game }) => {
  const [playerChoice, setPlayerChoice] = useState("");
  const [winner, setWinner] = useState("");
  const [firstPlayer, setFirstPlayer] = useState("");
  const [secondPlayer, setSecondPlayer] = useState("");
  const [selection, setSelection] = useState("");

  useEffect(() => {
    const player = {
      name: username,
      room: room,
      selection: playerChoice,
    };
    socket.emit("player-choice", player);
  }, [playerChoice]);

  socket.on("check-winner", (winner) => {
    console.log(winner);
    setWinner(winner.winner);
  });

  const playerChoiceSetter = (event) => {
    setPlayerChoice(event.target.value);
  };

  return (
    <div>
      {winner && <h1>Winner: {winner}!!!!!</h1>}
      <Button
        onClick={playerChoiceSetter}
        value="rock"
        variant="contained"
        color="primary"
      >
        Rock
      </Button>
      <Button
        onClick={playerChoiceSetter}
        value="paper"
        variant="contained"
        color="primary"
      >
        Paper
      </Button>
      <Button
        onClick={playerChoiceSetter}
        value="scissors"
        variant="contained"
        color="primary"
      >
        Scissors
      </Button>
      <h1>{playerChoice}</h1>
    </div>
  );
};

export default RockPaperScissors;
