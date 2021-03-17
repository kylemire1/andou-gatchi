import "normalize.css";
import { Helmet } from "react-helmet";
import styles from "../styles/App.module.scss";
import AndouGatchi from "./AndouGatchi";

function App() {
  return (
    <div className={styles.App}>
      <Helmet
        script={[
          {
            type: "text/javascript",
            src: "/socket.io/socket.io.js",
          },
        ]}
      />

      <AndouGatchi />
    </div>
  );
}

export default App;
