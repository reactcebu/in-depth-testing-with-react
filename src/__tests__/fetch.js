import React from "react";

import { render } from "@testing-library/react";
import { Fetch } from "../fetch";
import userEvent from "@testing-library/user-event";

import axios from "axios";

jest.mock("axios");

it("shows greeting fetched from API", async () => {
  const greeting = "Hello!";
  const url = "/greeting";
  axios.get.mockResolvedValueOnce({ data: { greeting } });

  const { getByRole, findByRole } = render(<Fetch url={url} />);

  const loadGreetingBtn = getByRole("button");
  userEvent.click(loadGreetingBtn);

  expect(await findByRole("heading")).toHaveTextContent(greeting);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(url);
});
