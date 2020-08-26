import { fireEvent, render } from "@testing-library/react";

import { Editor } from "../editor";
import React from "react";
import { savePost as mockSavePost } from "../api";

jest.mock("../api");

test("it renders a form with title, content, tags, and a submit button", () => {
  const { getByLabelText, getByText } = render(<Editor />);
  mockSavePost.mockResolvedValueOnce();

  const fakePost = {
    title: "New Title",
    content: "Test content",
    tags: ["tags1", "tags2"],
  };

  getByLabelText(/title/i).value = fakePost.title;
  getByLabelText(/content/i).value = fakePost.content;
  getByLabelText(/tags/i).value = fakePost.tags.join(", ");
  const submit = getByText(/submit/i);

  fireEvent.click(submit);

  expect(submit).toBeDisabled();
  expect(mockSavePost).toHaveBeenCalledTimes(1);
  expect(mockSavePost).toHaveBeenCalledWith(fakePost);
});
