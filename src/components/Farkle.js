import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./Farkle.css";

const Farkle = ({ game, socket, username, roomUsers, room }) => {
  const [roll, setRoll] = useState(false);
  const [player1Roll, setPlayer1Roll] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
  ]);
  const [player1, setPlayer1] = useState("");
  const [player1Keep, setPlayer1Keep] = useState("");
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

  useEffect(() => {
    const player = {
      name: username,
      room: room,
      roll: roll,
      keep: player1Keep,
      playerRoll: player1Roll,
    };
    socket.emit("start-game", player);
  }, [roll]);

  const handleRoll = () => {
    setRoll(true);
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

  //Sockets
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
    // console.log(data);
  });

  socket.on("roll", (data) => {
    setRoll(data.rollStatus);

    // const diceValue =
    //   +data.dice.one.split(".png")[0] +
    //   " " +
    //   +data.dice.two.split(".png")[0] +
    //   " " +
    //   +data.dice.three.split(".png")[0] +
    //   " " +
    //   +data.dice.four.split(".png")[0] +
    //   " " +
    //   +data.dice.five.split(".png")[0] +
    //   " " +
    //   +data.dice.six.split(".png")[0];
    // console.log(diceValue);

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
            {dice}
            <div className="mui-button">
              <Button variant="contained" color="primary">
                Stay
              </Button>
            </div>
          </div>
        )}
        {player2 && (
          <div className="player-card">
            <h3>{player2.toUpperCase()}</h3>
            {dice2}
            <div className="mui-button">
              <Button variant="contained" color="primary">
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
              <Button variant="contained" color="primary">
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
