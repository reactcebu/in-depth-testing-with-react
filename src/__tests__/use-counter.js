import { useCounter } from "../use-counter";
import { renderHook, act } from "@testing-library/react-hooks";

it("exposes the count, increment, and decrement functions", () => {
  const { result } = renderHook(useCounter);
  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(1);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

it("allows customization of the initial count", () => {
  const { result } = renderHook(useCounter, {
    initialProps: { initialCount: 5 },
  });

  expect(result.current.count).toBe(5);
});

it("allows customization of the step", () => {
  const { result } = renderHook(useCounter, { initialProps: { step: 2 } });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
  act(() => result.current.increment());
  expect(result.current.count).toBe(4);
});
