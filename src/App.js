import React from "react";
import { store } from "./redux-store";
import { Provider } from "react-redux";
import { Counter } from "./redux-counter";

function App() {
  return (
    <div className="App">
      Start writing tests at __tests__ directory.
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  );
}

export default App;
