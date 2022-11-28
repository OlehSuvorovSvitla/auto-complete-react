import React from "react";
import "./App.css";
import Autocomplete from "./Autocomplete/Autocomplete";

function App() {
  const suggestions = [
    "Alligator",
    "Bask",
    "Crocodilian",
    "Death Roll",
    "Eggs",
    "Jaws",
    "Reptile",
    "Solitary",
    "Tail",
    "Wetlands",
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-wrapper">
          <h1>React Auto complete input field on Typescript</h1>
        </div>
      </header>
      <main className="App-main">
        <div className="App-wrapper">
          <h2>Start typing here:</h2>
          <Autocomplete suggestions={suggestions} />
        </div>
      </main>
    </div>
  );
}

export default App;
