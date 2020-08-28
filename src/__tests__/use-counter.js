import { useCounter } from "../use-counter";
import React from "react";
import { act, render } from "@testing-library/react";

function setup({ initialProps } = {}) {
  const result = {};

  function TestComponent(props) {
    result.current = useCounter(props);
    return null;
  }

  render(<TestComponent {...initialProps} />);

  return result;
}

it("exposes the count, increment, and decrement functions", () => {
  const result = setup();
  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(1);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

it("allows customization of the initial count", () => {
  const result = setup({ initialProps: { initialCount: 5 } });

  expect(result.current.count).toBe(5);
});

it("allows customization of the step", () => {
  const result = setup({ initialProps: { step: 2 } });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
  act(() => result.current.increment());
  expect(result.current.count).toBe(4);
});
