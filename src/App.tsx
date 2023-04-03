import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hier binnenkort de Krappe Sokken website</p>
        <a
          className="App-link"
          href="https://www.instagram.com/krappesokkenband/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Onze insta
        </a>
      </header>
    </div>
  );
}

export default App;
