import { fireEvent, render } from "@testing-library/react";

import { FavoriteNumber } from "../favorite-number";
import React from "react";

test("it renders input with 'Favorite Number' label", () => {
  const { getByLabelText } = render(<FavoriteNumber />);
  const input = getByLabelText(/Favorite Number/i);
  expect(input).toHaveAttribute("type", "number");
});

test("entering an invalid number shows 'The number is invalid'", () => {
  const { getByLabelText, getByRole } = render(<FavoriteNumber />);
  const input = getByLabelText(/Favorite Number/i);
  fireEvent.change(input, { target: { value: 10 } });
  expect(getByRole("alert")).toHaveTextContent(/The number is invalid/);
});
