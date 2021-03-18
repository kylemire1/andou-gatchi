import React, { useState } from "react";

const ChromaKey = ({ bgColor, setBgColor }) => {
  const [value, setValue] = useState("");
  return (
    <div>
      <label htmlFor="color">Chroma Key Color</label>
      <br />
      <input
        placeholder={bgColor}
        type="text"
        id="color"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <button onClick={() => setBgColor(value)}>Set Chroma Key</button>
    </div>
  );
};

export default ChromaKey;
