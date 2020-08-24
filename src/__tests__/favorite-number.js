import { FavoriteNumber } from "../favorite-number";
import React from "react";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";

test("it renders input with 'Favorite Number' label", () => {
  const { getByLabelText } = render(<FavoriteNumber />);
  const input = getByLabelText(/Favorite Number/i);
  expect(input).toHaveAttribute("type", "number");
});

test("entering an invalid number shows 'The number is invalid'", () => {
  const { getByLabelText, getByRole } = render(<FavoriteNumber />);
  const input = getByLabelText(/Favorite Number/i);
  user.type(input, "10");
  expect(getByRole("alert")).toHaveTextContent(/The number is invalid/);
});
