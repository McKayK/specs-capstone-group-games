import React, { useState } from "react";

const Tile = (props) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    setValue("X");
  };

  return (
    <button onClick={handleClick} className={props.className}>
      {value}
    </button>
  );
};

export default Tile;
