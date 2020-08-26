import { fireEvent, render } from "@testing-library/react";

import { Editor } from "../editor";
import React from "react";

test("it renders a form with title, content, tags, and a submit button", () => {
  const { getByLabelText, getByText } = render(<Editor />);

  getByLabelText(/title/i);
  getByLabelText(/content/i);
  getByLabelText(/tags/i);
  const submit = getByText(/submit/i);

  fireEvent.click(submit);

  expect(submit).toBeDisabled();
});
