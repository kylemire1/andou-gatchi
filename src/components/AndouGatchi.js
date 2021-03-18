import { useEffect } from "react";
import { useMachine } from "@xstate/react";
import { gatchiMachine } from "../machines/gatchiMachine";
import io from "socket.io-client";
import styles from "../styles/AndouGatchi.module.scss";

const socket = io(process.env.API_URL || "http://localhost:4000");

const AndouGatchi = () => {
  const [current, send] = useMachine(gatchiMachine);
  useEffect(() => {
    socket.on("command", (msg) => {
      console.log("new command from server!", msg);
    });
  });

  return (
    <div>
      <div className={styles.GatchiWrapper}>
        <div className={styles.GatchiScreen}>{current.value}</div>
      </div>
      <button onClick={() => send("TOGGLE")}>Send</button>
    </div>
  );
};

export default AndouGatchi;
