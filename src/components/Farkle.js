import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./Farkle.css";

const Farkle = ({ game, socket, username, roomUsers, room }) => {
  const [roll, setRoll] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player1Keep, setPlayer1Keep] = useState("");
  const [playerStay, setPlayerStay] = useState([]);
  const [stayStatus, setStayStatus] = useState(false);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2, setPlayer2] = useState("");
  const [player2Score, setPlayer2Score] = useState(0);
  const [player3, setPlayer3] = useState("");
  const [player3Score, setPlayer3Score] = useState(0);
  const [player4, setPlayer4] = useState("");
  const [player4Score, setPlayer4Score] = useState(0);
  const [dice, setDice] = useState();
  const [dice2, setDice2] = useState();
  const [dice3, setDice3] = useState();
  const [dice4, setDice4] = useState();

  const playerRolls = (value, stay) => {
    const player = {
      name: username,
      room: room,
      roll: value ? value : roll,
      keep: player1Keep,
      stay: playerStay,
      stayStatus: stay ? stay : stayStatus,
    };
    socket.emit("start-game", player);
  };

  useEffect(() => {
    playerRolls();
  }, []);

  const handleRoll = async () => {
    await setRoll(true);
    playerRolls(true);
  };

  const hold1 = (event) => {
    setPlayer1Keep((preValue) => {
      if (!preValue) {
        return event.target.value;
      } else {
        return `${preValue},${event.target.value}`;
      }
    });
  };

  const stay = () => {
    setPlayer1Keep("");
    setStayStatus(true);
    playerRolls(true, true);
  };

  //Sockets
  socket.on("calculate-score", (data) => {
    console.log(data);
    if (player1 === data.username) {
      setPlayer1Score(data.score);
    } else if (player2 === data.username) {
      setPlayer2Score(data.score);
    }
  });

  socket.on("players", (data) => {
    if (data[0]) {
      setPlayer1(data[0].username);
    }
    if (data[1]) {
      setPlayer2(data[1].username);
    }
    if (data[2]) {
      setPlayer3(data[2].username);
    }
    if (data[3]) {
      setPlayer4(data[3].username);
    }
  });

  socket.on("roll", (data) => {
    setRoll(data.rollStatus);
    setPlayerStay([
      data.dice[0],
      data.dice[1],
      data.dice[2],
      data.dice[3],
      data.dice[4],
      data.dice[5],
    ]);

    if (data.username === player1) {
      setDice(
        <div className="dice">
          <div className="dice-button">
            <img src={`images/${data.dice[0]}`} alt="die1" />
            <Button
              onClick={hold1}
              value={`1 ${+data.dice[0].split(".png")[0]}`}
              variant="contained"
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[1]}`} alt="die2" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`2 ${+data.dice[1].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[2]}`} alt="die3" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`3 ${+data.dice[2].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[3]}`} alt="die4" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`4 ${+data.dice[3].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[4]}`} alt="die5" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`5 ${+data.dice[4].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[5]}`} alt="die6" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`6 ${+data.dice[5].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
        </div>
      );
    } else if (data.username === player2) {
      setDice2(
        <div className="dice">
          <div className="dice-button">
            <img src={`images/${data.dice[0]}`} alt="die1" />
            <Button
              onClick={hold1}
              value={`1 ${+data.dice[0].split(".png")[0]}`}
              variant="contained"
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[1]}`} alt="die2" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`2 ${+data.dice[1].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[2]}`} alt="die3" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`3 ${+data.dice[2].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[3]}`} alt="die4" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`4 ${+data.dice[3].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[4]}`} alt="die5" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`5 ${+data.dice[4].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[5]}`} alt="die6" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`6 ${+data.dice[5].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
        </div>
      );
    } else if (data.username === player3) {
      setDice3(
        <div className="dice">
          <div className="dice-button">
            <img src={`images/${data.dice[0]}`} alt="die1" />
            <Button
              onClick={hold1}
              value={`1 ${+data.dice[0].split(".png")[0]}`}
              variant="contained"
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[1]}`} alt="die2" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`2 ${+data.dice[1].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[2]}`} alt="die3" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`3 ${+data.dice[2].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[3]}`} alt="die4" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`4 ${+data.dice[3].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[4]}`} alt="die5" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`5 ${+data.dice[4].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[5]}`} alt="die6" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`6 ${+data.dice[5].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
        </div>
      );
    } else if (data.username === player4) {
      setDice4(
        <div className="dice">
          <div className="dice-button">
            <img src={`images/${data.dice[0]}`} alt="die1" />
            <Button
              onClick={hold1}
              value={`1 ${+data.dice[0].split(".png")[0]}`}
              variant="contained"
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[1]}`} alt="die2" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`2 ${+data.dice[1].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[2]}`} alt="die3" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`3 ${+data.dice[2].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[3]}`} alt="die4" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`4 ${+data.dice[3].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[4]}`} alt="die5" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`5 ${+data.dice[4].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
          <div className="dice-button">
            <img src={`images/${data.dice[5]}`} alt="die6" />
            <Button
              onClick={hold1}
              variant="contained"
              value={`6 ${+data.dice[5].split(".png")[0]}`}
              color="primary"
            >
              Keep
            </Button>
          </div>
        </div>
      );
    }

    console.log(data);
  });

  return (
    <div>
      {player1Keep}
      <Button onClick={handleRoll} variant="contained" color="primary">
        Roll
      </Button>
      <div className="players">
        {player1 && (
          <div className="player-card">
            <h3>{player1.toUpperCase()}</h3>

            {player1Score && (
              <div className="score">
                <h1>{player1Score}</h1>
              </div>
            )}
            {dice}
            <div className="mui-button">
              <Button onClick={stay} variant="contained" color="primary">
                Stay
              </Button>
            </div>
          </div>
        )}
        {player2 && (
          <div className="player-card">
            <h3>{player2.toUpperCase()}</h3>
            {player2Score && (
              <div className="score">
                <h1>{player2Score}</h1>
              </div>
            )}
            {dice2}
            <div className="mui-button">
              <Button onClick={stay} variant="contained" color="primary">
                Stay
              </Button>
            </div>
          </div>
        )}
        {player3 && (
          <div className="player-card">
            <h3>{player3.toUpperCase()}</h3>
            {dice3}
            <div className="mui-button">
              <Button onClick={stay} variant="contained" color="primary">
                Stay
              </Button>
            </div>
          </div>
        )}
        {player4 && (
          <div className="player-card">
            <h3>{player4.toUpperCase()}</h3>
            {dice4}
            <div className="mui-button">
              <Button
                onClick={stay}
                sx={{ paddingTop: 100 }}
                variant="contained"
                color="primary"
              >
                Stay
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Farkle;
