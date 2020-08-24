import { FavoriteNumber } from "../favorite-number";
import React from "react";
import ReactDOM from "react-dom";
import { getQueriesForElement } from "@testing-library/dom";

function render(ui) {
  const container = document.createElement("div");
  ReactDOM.render(ui, container);
  const queries = getQueriesForElement(container);

  return { container, ...queries };
}

test("it renders input with 'Favorite Number' label", () => {
  const { getByLabelText } = render(<FavoriteNumber />);
  const input = getByLabelText(/Favorite Number/i);
  expect(input).toHaveAttribute("type", "number");
});
