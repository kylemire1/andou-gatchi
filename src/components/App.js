import "normalize.css";
import "../index.css";
import AndouGatchi from "./AndouGatchi";
import { GatchiContextProvider } from "../contexts/GatchiContext";

function App() {
  return (
    <GatchiContextProvider>
      <AndouGatchi />
    </GatchiContextProvider>
  );
}

export default App;
