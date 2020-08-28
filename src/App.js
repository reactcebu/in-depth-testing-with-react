import React from "react";
import { Fetch } from "./fetch";

function App() {
  return (
    <div className="App">
      <Fetch url="https://wt-873f548fdd5b60d59d25e0cae4a5051c-0.sandbox.auth0-extend.com/load-greeting" />
    </div>
  );
}

export default App;
