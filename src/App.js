import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GameChooser from "./components/GameChooser";
import RockPaperScissors from "./components/RockPaperScissors";
import TicTacToe from "./components/TicTacToe";

const socket = io.connect("http://localhost:3003");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joinedStatus, setJoinedStatus] = useState(false);
  const [roomUsers, setRoomUsers] = useState([]);
  const [game, setGame] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "" && game !== "") {
      socket.emit("join-room", room, game, username);
      setJoinedStatus(true);
    }
  };

  const handleGame = (event) => {
    setGame(event.target.value);
  };

  const handleBack = () => {
    setJoinedStatus(false);
  };

  return (
    <div className="App">
      {!joinedStatus ? (
        <div>
          <h2>Join Room</h2>
          <h3>Select a game</h3>
          <input onChange={handleGame} type="radio" value="rps" />
          Rock Paper Scissors
          <input onChange={handleGame} type="radio" value="ttt" />
          Tic Tac Toe
          <br />
          <br />
          <TextField
            id=""
            label="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            id=""
            label="Room Code"
            onChange={(event) => setRoom(event.target.value)}
          />
          <Button onClick={joinRoom} variant="contained" color="primary">
            Join Room
          </Button>
        </div>
      ) : game === "rps" ? (
        <div>
          <RockPaperScissors
            game={game}
            socket={socket}
            username={username}
            roomUsers={roomUsers}
            room={room}
          />
          <br />
          <br />
          <Button onClick={handleBack} variant="contained" color="primary">
            Back
          </Button>
        </div>
      ) : (
        <div>
          <TicTacToe
            game={game}
            socket={socket}
            username={username}
            roomUsers={roomUsers}
            room={room}
          />
          <br />
          <br />
          <Button onClick={handleBack} variant="contained" color="primary">
            Back
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
