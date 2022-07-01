import React from "react";
import Button from "@mui/material/Button";

const PlayersDice = ({ data }) => {
  return (
    <div className="dice">
      <div className="dice-button">
        <img src={`images/${data.dice.one}`} alt="die1" />
        <Button variant="contained" color="primary">
          Keep
        </Button>
      </div>
      <div className="dice-button">
        <img src={`images/${data.dice.two}`} alt="die2" />
        <Button variant="contained" color="primary">
          Keep
        </Button>
      </div>
      <div className="dice-button">
        <img src={`images/${data.dice.three}`} alt="die3" />
        <Button variant="contained" color="primary">
          Keep
        </Button>
      </div>
      <div className="dice-button">
        <img src={`images/${data.dice.four}`} alt="die4" />
        <Button variant="contained" color="primary">
          Keep
        </Button>
      </div>
      <div className="dice-button">
        <img src={`images/${data.dice.five}`} alt="die5" />
        <Button variant="contained" color="primary">
          Keep
        </Button>
      </div>
      <div className="dice-button">
        <img src={`images/${data.dice.six}`} alt="die6" />
        <Button variant="contained" color="primary">
          Keep
        </Button>
      </div>
    </div>
  );
};

export default PlayersDice;
