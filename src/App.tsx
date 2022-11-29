import React, { useEffect, useState } from "react";
import "./App.css";
import Autocomplete from "./Autocomplete/Autocomplete";
import { getDummyProducts } from "./api";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getDummyProducts();
      setData(data);
    })();
  }, []);

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
          <Autocomplete suggestions={data} />
        </div>
      </main>
    </div>
  );
};

export default App;
