import React from "react";
import { Main } from "../main";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function render(ui, { route, ...rtlOptions } = {}) {
  const history = createMemoryHistory({
    initialEntries: route || ["/"],
  });
  return rtlRender(<Router history={history}>{ui}</Router>, rtlOptions);
}

test("main renders home and I can navigate to about", () => {
  const { getByRole, getByText } = render(<Main />);

  expect(getByRole("heading")).toHaveTextContent(/home/i);
  const aboutLink = getByText(/about/i);
  userEvent.click(aboutLink);
  expect(getByRole("heading")).toHaveTextContent(/about/i);
});

test("navigating to a unregistered route lands on a bad page via no match component", () => {
  const { getByRole } = render(<Main />, { route: ["/fooo"] });

  expect(getByRole("heading")).toHaveTextContent(/404/i);
});
