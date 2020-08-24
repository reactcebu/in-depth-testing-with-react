import { FavoriteNumber } from "../favorite-number";
import React from "react";
import { render } from "@testing-library/react";

test("it renders input with 'Favorite Number' label", () => {
  const { getByLabelText } = render(<FavoriteNumber />);
  const input = getByLabelText(/Favorite Number/i);
  expect(input).toHaveAttribute("type", "number");
});
