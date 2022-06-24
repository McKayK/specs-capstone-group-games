import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const GameChooser = ({ username, roomUsers, room, socket }) => {
  const [number, setNumber] = useState(0);

  console.log(room);

  const add = () => {
    socket.emit("add-number", number, room);
    setNumber(number + 1);
  };

  socket.on("updated-number", (number) => {
    setNumber(number.number);
  });

  const subtract = () => {
    socket.emit("subtract-number", number, room);
    setNumber(number - 1);
  };

  return (
    <div>
      <div>
        <h1>Push the Button</h1>
        <h1>{number}</h1>
        <Button onClick={add} variant="contained" color="primary">
          Add 1
        </Button>
        <Button onClick={subtract} variant="contained" color="primary">
          Minus 1
        </Button>
      </div>
    </div>
  );
};

export default GameChooser;
