import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga4";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Defer analytics initialization until after the page loads
const initializeGA = () => {
  ReactGA.initialize("G-7STC6XK71K");
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Delayed analytics initialization
if (window.requestIdleCallback) {
  window.requestIdleCallback(initializeGA);
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(initializeGA, 1000);
}

const SendAnalytics = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
};

// Only measure performance metrics when page is fully loaded
window.addEventListener("load", () => {
  reportWebVitals(SendAnalytics);
});
