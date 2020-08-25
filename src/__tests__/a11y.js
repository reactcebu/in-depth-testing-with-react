import React from "react";
import { axe } from "jest-axe";
import { render } from "@testing-library/react";

const { InaccessibleForm } = require("../a11y");

test("the form is accessible", async () => {
  const { container } = render(<InaccessibleForm />);
  console.log(container.innerHTML);
  const results = await axe(container);
  expect(results.violations).toHaveLength(0);
});
