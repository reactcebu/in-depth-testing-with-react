import React from "react";
import { App } from "../app";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { submitForm as mockSubmitForm } from "../api";

jest.mock("../api");

it("can fill out the form across multiple pages", async () => {
  mockSubmitForm.mockResolvedValueOnce({ success: true });

  const { getByLabelText, getByText, getByRole, findByRole } = render(<App />);

  const testData = {
    drink: "Lemon",
    food: "hamburger",
  };

  userEvent.click(getByText(/fill.*form/i));

  userEvent.type(getByLabelText(/food/i), testData.food);
  userEvent.click(getByText(/next/i));

  userEvent.type(getByLabelText(/drink/i), testData.drink);
  userEvent.click(getByText(/review/i));

  expect(getByLabelText(/food/i)).toHaveTextContent(testData.food);
  expect(getByLabelText(/drink/i)).toHaveTextContent(testData.drink);

  userEvent.click(getByRole("button", { name: /confirm/i }));

  expect(mockSubmitForm).toHaveBeenCalledTimes(1);
  expect(mockSubmitForm).toHaveBeenCalledWith(testData);

  const congratsHeading = await findByRole("heading", { name: /congrats/i });
  expect(congratsHeading).toHaveTextContent(/congrats/i);

  userEvent.click(getByText(/go home/i));
  expect(getByText(/welcome home/i)).toBeInTheDocument();
});
