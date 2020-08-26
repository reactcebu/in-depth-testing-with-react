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

test("it renders a form with title, content, tags, and a submit button", () => {
  const { getByLabelText, getByText } = render(<Editor />);
  mockSavePost.mockResolvedValueOnce();

  const fakePost = postBuilder();

  getByLabelText(/title/i).value = fakePost.title;
  getByLabelText(/content/i).value = fakePost.content;
  getByLabelText(/tags/i).value = fakePost.tags.join(", ");
  const submit = getByText(/submit/i);

  fireEvent.click(submit);

  expect(submit).toBeDisabled();
  expect(mockSavePost).toHaveBeenCalledTimes(1);
  expect(mockSavePost).toHaveBeenCalledWith(fakePost);
});

test("it renders error message from the server", async () => {
  const { getByText, findByRole } = render(<Editor />);
  mockSavePost.mockRejectedValueOnce({ data: { error: "test error" } });

  const submit = getByText(/submit/i);

  fireEvent.click(submit);

  expect(mockSavePost).toHaveBeenCalledTimes(1);
  const errorMessage = await findByRole("alert");
  expect(errorMessage).toHaveTextContent("test error");
  expect(submit).not.toBeDisabled();
});
