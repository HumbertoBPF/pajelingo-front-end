import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { MemoryRouter } from "react-router-dom";
import { setupStore } from "store/store";

export function renderWithProviders(
  ui,
  {
    initialEntries,
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </Provider>
    );
  }

  Wrapper.propTypes = {
    children: PropTypes.node
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
