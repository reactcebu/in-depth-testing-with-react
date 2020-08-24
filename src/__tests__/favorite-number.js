import { FavoriteNumber } from "../favorite-number";
import React from "react";
import ReactDOM from "react-dom";

test("it renders input with 'Favorite Number' label", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FavoriteNumber />, div);

  expect(div.querySelector("input")).toHaveAttribute("type", "number");
  expect(div.querySelector("label")).toHaveTextContent("Favorite Number");
});
