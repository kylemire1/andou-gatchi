import { useEffect, useContext } from "react";
import io from "socket.io-client";
import {
  feed,
  fullHealth,
  returnToIdle,
} from "../contexts/actions/gatchiContextActions";
import GatchiContext from "../contexts/GatchiContext";
import styles from "../styles/AndouGatchi.module.scss";
import Andou from "./Andou";
import HealthBar from "./HealthBar";

const socket = io("https://andoubot-server.herokuapp.com/");

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
      if (+bits >= 100) {
        bitFeed(username, +bits);
        socket.emit("bits-food", { username, bits });
      } else {
        socket.emit("bits-no-food", { username, bits });
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
    }, 5000);
  };

  return (
    <div>
      <div className={styles.GatchiWrapper}>
        <div className={styles.GatchiScreen}>
          <Andou currentState={currentState} />
          <HealthBar health={health} />
        </div>
      </div>
    </div>
  );
};

export default AndouGatchi;
