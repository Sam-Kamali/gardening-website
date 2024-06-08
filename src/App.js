import React from "react";
import "./App.css";
import Recommendation from "./components/Recommendation";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gardening Recommendations</h1>
        <Recommendation />
      </header>
    </div>
  );
}

export default App;
