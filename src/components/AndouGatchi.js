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

    socket.on("cheer", ({ bits, username }) => {
      if (!donors.includes[username] && +bits >= 100) {
        bitFeed(username, +bits);
        socket.emit("do-thank", username);
      } else if (donors.includes[username]) {
        socket.emit("dont-thank", username);
      }
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

  const bitFeed = (username, bits) => {
    if (currentState === "full") {
      return;
    }

    const feedAmount = Math.floor(bits / 100) * 2;

    feedAndReset(feedAmount, username);
  };

  const feedAndReset = (amount, username) => {
    dispatch(feed(amount, username));
    setTimeout(() => {
      dispatch(returnToIdle());
    }, 3000);
  };

  // const displayHealth = health > 100 ? 100 : health;

  return (
    <div>
      <div className={styles.GatchiWrapper}>
        <div className={styles.GatchiScreen}></div>
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
