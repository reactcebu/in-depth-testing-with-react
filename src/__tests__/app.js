import React from "react";
import { App } from "../app-reach-router";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { submitForm as mockSubmitForm } from "../api";

jest.mock("../api");

it("can fill out the form across multiple pages", async () => {
  mockSubmitForm.mockResolvedValueOnce({ success: true });

  const { findByLabelText, findByText, findByRole } = render(<App />);

  const testData = {
    drink: "Lemon",
    food: "hamburger",
  };

  userEvent.click(await findByText(/fill.*form/i));

  userEvent.type(await findByLabelText(/food/i), testData.food);
  userEvent.click(await findByText(/next/i));

  userEvent.type(await findByLabelText(/drink/i), testData.drink);
  userEvent.click(await findByText(/review/i));

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food);
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink);

  userEvent.click(await findByRole("button", { name: /confirm/i }));

  expect(mockSubmitForm).toHaveBeenCalledTimes(1);
  expect(mockSubmitForm).toHaveBeenCalledWith(testData);

  const congratsHeading = await findByRole("heading", { name: /congrats/i });
  expect(congratsHeading).toHaveTextContent(/congrats/i);

  userEvent.click(await findByText(/go home/i));
  expect(await findByText(/welcome home/i)).toBeInTheDocument();
});
