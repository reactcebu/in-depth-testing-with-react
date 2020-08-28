import { build, fake } from "test-data-bot";
import { fireEvent, render } from "@testing-library/react";

import { Editor } from "../editor";
import React from "react";
import { savePost as mockSavePost } from "../api";

jest.mock("../api");

afterEach(() => {
  mockSavePost.mockClear();
});

const postBuilder = build("Post").fields({
  title: fake((f) => f.lorem.words()),
  content: fake((f) => f.lorem.paragraph()),
  tags: fake((f) => [f.lorem.words(), f.lorem.words(), f.lorem.words()]),
});

function renderEditor() {
  const utils = render(<Editor />);

  const fakePost = postBuilder();

  utils.getByLabelText(/title/i).value = fakePost.title;
  utils.getByLabelText(/content/i).value = fakePost.content;
  utils.getByLabelText(/tags/i).value = fakePost.tags.join(", ");
  const submit = utils.getByText(/submit/i);

  return {
    fakePost,
    submit,
    ...utils,
  };
}

test("it renders a form with title, content, tags, and a submit button", () => {
  mockSavePost.mockResolvedValueOnce();
  const { submit, fakePost } = renderEditor();

  fireEvent.click(submit);

  expect(submit).toBeDisabled();
  expect(mockSavePost).toHaveBeenCalledTimes(1);
  expect(mockSavePost).toHaveBeenCalledWith(fakePost);
});

test("it renders error message from the server", async () => {
  mockSavePost.mockRejectedValueOnce({ data: { error: "test error" } });
  const { findByRole, getByText } = renderEditor();

  const submit = getByText(/submit/i);

  fireEvent.click(submit);

  expect(mockSavePost).toHaveBeenCalledTimes(1);
  const errorMessage = await findByRole("alert");
  expect(errorMessage).toHaveTextContent("test error");
  expect(submit).not.toBeDisabled();
});
