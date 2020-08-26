import { ErrorBoundary } from "./error-boundary";
import React from "react";

function Bomb({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error("💣");
  } else {
    return null;
  }
}

function App() {
  return (
    <div className="App">
      Start writing tests at __tests__ directory.
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
