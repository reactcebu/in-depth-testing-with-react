import { fireEvent, render, wait } from "@testing-library/react";

import { HiddenMessage } from "../hidden-message";
import React from "react";

test("it shows hidden message when toggle is clicked", async () => {
  const message = "Suprise Me!";
  const { getByText, queryByText } = render(
    <HiddenMessage>{message}</HiddenMessage>
  );
  const button = getByText(/Toggle/i);

  expect(queryByText(message)).not.toBeInTheDocument();

  fireEvent.click(button);
  expect(queryByText(message)).toBeInTheDocument();

  fireEvent.click(button);
  // We have to wait here now to finish transition in order for test to pass
  await wait(() => expect(queryByText(message)).not.toBeInTheDocument());
});
