import { useEffect } from "react";
import { useMachine } from "@xstate/react";
import { gatchiMachine } from "../machines/gatchiMachine";
import { io } from "socket.io-client";

const socket = io();

const AndouGatchi = () => {
  const [current, send] = useMachine(gatchiMachine);

  useEffect(() => {
    socket.on("new-command", () => {
      console.log("new command from server!");
    });
  });

  return (
    <button onClick={() => socket.emit("client-emit", "wow")}>
      Emit Socket Event
    </button>
  );
};

export default AndouGatchi;
