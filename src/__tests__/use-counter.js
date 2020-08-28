import { useCounter } from "../use-counter";
import React from "react";
import { act, render } from "@testing-library/react";

it("exposes the count, increment, and decrement functions", () => {
  let result;
  function TestComponent() {
    result = useCounter();
    return null;
  }

  render(<TestComponent />);
  expect(result.count).toBe(0);
  act(() => result.increment());
  expect(result.count).toBe(1);
  act(() => result.decrement());
  expect(result.count).toBe(0);
});
