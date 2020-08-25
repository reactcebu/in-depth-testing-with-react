import { axe, toHaveNoViolations } from "jest-axe";

import React from "react";
import { render } from "@testing-library/react";

const { InaccessibleForm } = require("../a11y");
expect.extend(toHaveNoViolations);

test("the form is accessible", async () => {
  const { container } = render(<InaccessibleForm />);
  console.log(container.innerHTML);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
