import { ErrorBoundary } from "../error-boundary";
import React from "react";
import { reportError as mockReportError } from "../api";
import { render } from "@testing-library/react";

jest.mock("../api.js");

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  console.error.mockRestore();
  console.log("aluu!");
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
  const { rerender } = render(
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
});
