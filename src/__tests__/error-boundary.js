import { fireEvent, render } from "@testing-library/react";

import { ErrorBoundary } from "../error-boundary";
import React from "react";
import { reportError as mockReportError } from "../api";

jest.mock("../api.js");

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  console.error.mockRestore();
});

function Bomb({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error("💣");
  } else {
    return null;
  }
}

it("calls reportError and renders error", () => {
  mockReportError.mockResolvedValueOnce({ success: true });
  const { rerender, debug, getByText, queryByText, queryByRole } = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>
  );
  expect(mockReportError).toHaveBeenCalledTimes(1);
  const error = expect.any(Error);
  const info = { componentStack: expect.stringContaining("Bomb") };
  expect(mockReportError).toHaveBeenCalledWith(error, info);
  expect(console.error).toHaveBeenCalledTimes(2);
  expect(queryByRole("alert")).toBeInTheDocument();

  mockReportError.mockClear();
  console.error.mockClear();

  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );

  fireEvent.click(getByText(/try again/i));

  expect(mockReportError).not.toHaveBeenCalled();
  expect(console.error).not.toHaveBeenCalled();
  expect(queryByRole("alert")).not.toBeInTheDocument();
  expect(queryByText(/try again/i)).not.toBeInTheDocument();
});
