import { fireEvent, render } from "@testing-library/react";

import { HiddenMessage } from "../hidden-message";
import React from "react";

jest.mock("react-transition-group", () => {
  return {
    CSSTransition: (props) => (props.in ? props.children : null),
  };
});

test("it shows hidden message when toggle is clicked", () => {
  const message = "Suprise Me!";
  const { getByText, queryByText } = render(
    <HiddenMessage>{message}</HiddenMessage>
  );
  const button = getByText(/Toggle/i);

  expect(queryByText(message)).not.toBeInTheDocument();

  fireEvent.click(button);
  expect(queryByText(message)).toBeInTheDocument();

  fireEvent.click(button);
  expect(queryByText(message)).not.toBeInTheDocument();
});
