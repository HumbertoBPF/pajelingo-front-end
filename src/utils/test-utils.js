import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { MemoryRouter } from "react-router-dom";
import { setupStore } from "store/store";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }

  Wrapper.propTypes = {
    children: PropTypes.node
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
