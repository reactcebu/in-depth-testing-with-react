import { FavoriteNumber } from "../favorite-number";
import React from "react";
import ReactDOM from "react-dom";
import { getQueriesForElement } from "@testing-library/dom";

test("it renders input with 'Favorite Number' label", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FavoriteNumber />, div);
  const { getByLabelText } = getQueriesForElement(div);

  const input = getByLabelText(/Favorite Number/i);
  expect(input).toHaveAttribute("type", "number");
});
