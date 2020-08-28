import React from "react";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { render } from "@testing-library/react";
import { Fetch } from "../fetch";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.get("/greeting", (req, res, ctx) => {
    return res(ctx.json({ greeting: "Hello!" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("shows greeting fetched from API", async () => {
  const greeting = "Hello!";
  const url = "/greeting";

  const { getByRole, findByRole } = render(<Fetch url={url} />);

  const loadGreetingBtn = getByRole("button");
  userEvent.click(loadGreetingBtn);

  expect(await findByRole("heading")).toHaveTextContent(greeting);
});

test("handles server error", async () => {
  server.use(
    rest.get(`/greeting`, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  const url = "/greeting";

  const { getByRole, findByRole } = render(<Fetch url={url} />);

  const loadGreetingBtn = getByRole("button");
  userEvent.click(loadGreetingBtn);

  expect(await findByRole("alert")).toHaveTextContent("Oops, failed to fetch!");
});
