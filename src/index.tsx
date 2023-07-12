import React from "react";
import ReactDOM from "react-dom/client";
import TagManager from "react-gtm-module";
import "./index.css";
import App from "./App";

const tagManagerArgs = {
  gtmId: "G-7STC6XK71K",
};

TagManager.initialize(tagManagerArgs);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
