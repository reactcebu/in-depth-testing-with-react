import React from "react";
import { Main } from "../main";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("main renders home and I can navigate to about", () => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  const { getByRole, getByText } = render(
    <Router history={history}>
      <Main />
    </Router>
  );

  expect(getByRole("heading")).toHaveTextContent(/home/i);
  const aboutLink = getByText(/about/i);
  userEvent.click(aboutLink);
  expect(getByRole("heading")).toHaveTextContent(/about/i);
});
