import { useState } from "react";
import "normalize.css";
import styles from "../styles/App.module.scss";
import AndouGatchi from "./AndouGatchi";
import ChromaKey from "./ChromaKey";
import { GatchiContextProvider } from "../contexts/GatchiContext";

function App() {
  const [bgColor, setBgColor] = useState("#FFFFFF");
  return (
    <GatchiContextProvider>
      <div style={{ backgroundColor: bgColor }} className={styles.App}>
        <AndouGatchi />
        <ChromaKey bgColor={bgColor} setBgColor={setBgColor} />
      </div>
    </GatchiContextProvider>
  );
}

export default App;
