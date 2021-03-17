import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { typography } from "./typography";

typography.injectStyles();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
