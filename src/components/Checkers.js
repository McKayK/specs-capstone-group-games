import React from "react";
import "./Checkers.css";

const Checkers = () => {
  const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
  const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

  let tiles = [];

  for (let i = 0; i < verticalAxis.length; i++) {
    for (let x = 0; x < horizontalAxis.length; x++) {
      const number = i + x + 2;

      if (number % 2 === 0) {
        tiles.push(<div className="dark" key={Math.random() * 100}></div>);
      } else {
        tiles.push(<div className="light" key={Math.random() * 100}></div>);
      }
    }
  }

  return (
    <div>
      <h1>Checkers!</h1>
      <div id="board"> {tiles}</div>
    </div>
  );
};

export default Checkers;
