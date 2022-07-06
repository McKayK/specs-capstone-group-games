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
        <div
          className="main-background"
          style={{
            background:
              "url(images/virtualgamenight.png) fixed no-repeat center center",
            backgroundSize: "cover",
          }}
        >
          <h1 className="header neonText">
            WELCOME TO YOUR VIRTUAL GAME NIGHT!
          </h1>
          <h2 className="neonText">To begin...pick a code...</h2>
          <br />
          <br />
          <h2 className="neonText" id="joinRoom">
            Join A Room!
          </h2>
          <div className="inputs">
            <div className="fields">
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
              {/* <TextField
              sx={{ background: "white", margin: "10px" }}
              id=""
              label="Username"
              onChange={(event) => setUsername(event.target.value)}
            /> */}
              <input
                type="text"
                id="room-code"
                placeholder="Room Code"
                onChange={(event) => setRoom(event.target.value)}
              />
              {/* <TextField
              sx={{ background: "white", margin: "10px" }}
              id=""
              label="Room Code"
              onChange={(event) => setRoom(event.target.value)}
            /> */}
            </div>
            <button className="neon button neonText" onClick={joinRoom}>
              Join Room
            </button>
          </div>
          {/* <Button onClick={joinRoom} variant="contained" color="primary">
            Join Room
          </Button> */}
        </div>
      ) : (
        <div
          className="main-background"
          style={{ backgroundImage: "url(images/virtualgamenight.png)" }}
        >
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
