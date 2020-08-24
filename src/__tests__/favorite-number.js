import { FavoriteNumber } from "../favorite-number";
import React from "react";
import ReactDOM from "react-dom";
import { queries } from "@testing-library/dom";

test("it renders input with 'Favorite Number' label", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FavoriteNumber />, div);

  const input = queries.getByLabelText(div, /Favorite Number/i);

  expect(input).toHaveAttribute("type", "number");
});
