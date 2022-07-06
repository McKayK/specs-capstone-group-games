import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import "./RockPaperScissors.css";

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
    if (playerChoice && winner) {
      setPlayerChoice("");
      // setWinner("");
    } else {
      console.log(winner);
      setWinner(winner.winner);
    }
  });

  const playerChoiceSetter = (event) => {
    setPlayerChoice(event.target.value);
  };

  return (
    <div className="main-background">
      {winner && <h1>Winner: {winner.toUpperCase()}!!!!!</h1>}
      {!playerChoice && (
        <div className="rps-buttons">
          <button
            id="rock"
            className="buttons"
            onClick={playerChoiceSetter}
            value="rock"
            style={{ backgroundImage: "url(images/rock.png)" }}
          ></button>
          <button
            className="buttons"
            onClick={playerChoiceSetter}
            value="paper"
            style={{ backgroundImage: "url(images/paper.png)" }}
          ></button>
          <button
            className="buttons"
            onClick={playerChoiceSetter}
            value="scissors"
            style={{ backgroundImage: "url(images/scissors.png)" }}
          ></button>
          {/* <Button
            onClick={playerChoiceSetter}
            value="rock"
            variant="contained"
            color="primary"
          >
            Rock
          </Button> */}
          {/* <Button
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
          </Button> */}
        </div>
      )}
      <h1 id="rps-choice">{playerChoice}</h1>
    </div>
  );
};

export default RockPaperScissors;
