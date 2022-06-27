import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GameChooser from "./components/GameChooser";

const socket = io.connect("http://localhost:3003");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joinedStatus, setJoinedStatus] = useState(false);
  const [roomUsers, setRoomUsers] = useState([]);
  const [game, setGame] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join-room", room, game, username);
      setJoinedStatus(true);
    }
  };

  return (
    <div className="App">
      {!joinedStatus ? (
        <div>
          <h2>Create A Room!</h2>
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
            Create Room
          </Button>
        </div>
      ) : (
        <div>
          <GameChooser
            game={game}
            socket={socket}
            username={username}
            roomUsers={roomUsers}
            room={room}
            setJoinedStatus={setJoinedStatus}
            setGame={setGame}
          />
        </div>
      )}
    </div>
  );
}

export default App;
