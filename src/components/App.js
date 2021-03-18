import { useState } from "react";
import "normalize.css";
import styles from "../styles/App.module.scss";
import AndouGatchi from "./AndouGatchi";
import ChromaKey from "./ChromaKey";

function App() {
  const [bgColor, setBgColor] = useState("#FFFFFF");
  return (
    <div style={{ backgroundColor: bgColor }} className={styles.App}>
      <AndouGatchi />
      <ChromaKey bgColor={bgColor} setBgColor={setBgColor} />
    </div>
  );
}

export default App;
