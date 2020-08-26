import { fireEvent, render, wait } from "@testing-library/react";

import { GreetingLoader } from "../greeting-loader";
import React from "react";
import { loadGreeting } from "../api";

jest.mock("../api");

it("loads greeting on click", async () => {
  const inputValue = "Mary";
  loadGreeting.mockResolvedValueOnce({ data: { greeting: inputValue } });

  const { getByLabelText, getByRole } = render(<GreetingLoader />);
  const input = getByLabelText(/name/i);
  const button = getByRole("button");

  input.value = inputValue;
  fireEvent.click(button);

  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(inputValue)
  );
});
