import { useMachine } from "@xstate/react";
import { gatchiMachine } from "../machines/gatchiMachine";

const AndouGatchi = () => {
  const [current, send] = useMachine(gatchiMachine);

  return (
    <button onClick={() => send("TOGGLE")}>
      {current.matches("inactive") ? "Off" : "On"}
    </button>
  );
};

export default AndouGatchi;
