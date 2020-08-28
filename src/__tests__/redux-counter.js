import React from "react";
import { Provider } from "react-redux";
import { Counter } from "../redux-counter";
import { render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "redux";
import { reducer } from "../redux-reducer";

function render(
  ui,
  { initialState, store = createStore(reducer, initialState), ...options } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

test("it can render Counter with redux defaults", () => {
  const { getByText, getByLabelText } = render(<Counter />);

  const plusBtn = getByText("+");
  userEvent.click(plusBtn);

  const countLabel = getByLabelText(/count/i);
  expect(countLabel).toHaveTextContent("1");
});

test("it can render Counter with redux initialized state", () => {
  const { getByText, getByLabelText } = render(<Counter />, {
    initialState: { count: 3 },
  });

  const plusBtn = getByText("-");
  userEvent.click(plusBtn);

  const countLabel = getByLabelText(/count/i);
  expect(countLabel).toHaveTextContent("2");
});
