import React, { useReducer, useMemo } from "react";
import gatchiContextReducer, {
  GATCHI_CONTEXT_INITIAL_STATE,
} from "./gatchiContextReducer";

const GatchiContext = React.createContext();

export const GatchiContextProvider = ({ children }) => {
  const [gatchiState, dispatch] = useReducer(
    gatchiContextReducer,
    GATCHI_CONTEXT_INITIAL_STATE
  );

  const gatchiContextValue = useMemo(() => [gatchiState, dispatch], [
    gatchiState,
    dispatch,
  ]);

  return (
    <GatchiContext.Provider value={gatchiContextValue}>
      {children}
    </GatchiContext.Provider>
  );
};

export default GatchiContext;
