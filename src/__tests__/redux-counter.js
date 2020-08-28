import React from "react";
import { Provider } from "react-redux";
import { Counter } from "../redux-counter";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { store as appStore } from "../redux-store";
import { createStore } from "redux";
import { reducer } from "../redux-reducer";

test("it can render Counter with redux defaults", () => {
  const { getByText, getByLabelText } = render(
    <Provider store={appStore}>
      <Counter />
    </Provider>
  );

  const plusBtn = getByText("+");
  userEvent.click(plusBtn);

  const countLabel = getByLabelText(/count/i);
  expect(countLabel).toHaveTextContent("1");
});

test("it can render Counter with redux initialized state", () => {
  const store = createStore(reducer, { count: 3 });
  const { getByText, getByLabelText } = render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );

  const plusBtn = getByText("-");
  userEvent.click(plusBtn);

  const countLabel = getByLabelText(/count/i);
  expect(countLabel).toHaveTextContent("2");
});
