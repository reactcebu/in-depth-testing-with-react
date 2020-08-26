import { fireEvent, render, wait } from "@testing-library/react";

import { GreetingLoader } from "../greeting-loader";
import React from "react";

it("loads greeting on click", async () => {
  const inputValue = "Mary";
  const mockedLoadGreeting = jest.fn();
  mockedLoadGreeting.mockResolvedValueOnce({ data: { greeting: inputValue } });

  const { getByLabelText, getByRole } = render(
    <GreetingLoader loadGreeting={mockedLoadGreeting} />
  );
  const input = getByLabelText(/name/i);
  const button = getByRole("button");

  input.value = inputValue;
  fireEvent.click(button);

  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(inputValue)
  );
});
