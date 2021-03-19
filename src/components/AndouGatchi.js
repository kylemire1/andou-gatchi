import { useEffect, useContext } from "react";
import io from "socket.io-client";
import {
  feed,
  fullHealth,
  returnToIdle,
} from "../contexts/actions/gatchiContextActions";
import GatchiContext from "../contexts/GatchiContext";
import styles from "../styles/AndouGatchi.module.scss";

const socket = io(process.env.API_URL || "http://localhost:4000");

const AndouGatchi = () => {
  const [{ currentState, health, donors }, dispatch] = useContext(
    GatchiContext
  );

  useEffect(() => {
    socket.on("command", (username) => {
      console.log("new command from server!", { username });

      if (!donors.includes(username)) {
        commandFeed(username);
        socket.emit("do-thank", username);
      } else {
        socket.emit("dont-thank", username);
      }
    });

    socket.on("cheer", (data) => {
      console.log({ data });
    });

    return () => socket.off();
  });

  useEffect(() => {
    if (health >= 100 && currentState !== "full") {
      dispatch(fullHealth());
    }
  });

  const commandFeed = (username) => {
    if (currentState === "full") {
      return;
    }

    feedAndReset(1, username);
  };

  const feedAndReset = (amount, username) => {
    dispatch(feed(amount, username));
    setTimeout(() => {
      dispatch(returnToIdle());
    }, 2000);
  };

  const displayHealth = health > 100 ? 100 : health;

  return (
    <div>
      <div className={styles.GatchiWrapper}>
        <div className={styles.GatchiScreen}>
          <div>State: {currentState}</div>
          <div>Health: {displayHealth}</div>
        </div>
        <div className={styles.GatchiButtons}>
          <div />
          <div />
          <div />
        </div>
      </div>
      <pre>{JSON.stringify({ currentState, health, donors }, null, 2)}</pre>
    </div>
  );
};

export default AndouGatchi;
