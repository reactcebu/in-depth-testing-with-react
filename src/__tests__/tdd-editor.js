import { Editor } from "../editor";
import React from "react";
import { render } from "@testing-library/react";

test("it renders a form with title, content, tags, and a submit button", () => {
  const { getByLabelText, getByText } = render(<Editor />);

  getByLabelText(/title/i);
  getByLabelText(/content/i);
  getByLabelText(/tags/i);
  getByText(/submit/i);
});
