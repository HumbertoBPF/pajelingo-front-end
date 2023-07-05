import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "store";
const { default: AccountMenu } = require("../components/AccountMenu");

it("should display two buttons when no user props is specified", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <AccountMenu />
      </MemoryRouter>
    </Provider>
  );

  const signUpButton = screen.getByTestId("signup-button");
  const signInButton = screen.getByTestId("signin-button");

  expect(signUpButton.textContent).toBe(" Sign up");
  expect(signInButton.textContent).toBe(" Sign in");
});

it("should display user profile dropdown when user props is specified", async () => {
  const user = userEvent.setup();

  const userData = {
    username: "HumbertoBPF",
    picture: null
  };

  render(
    <Provider store={store}>
      <MemoryRouter>
        <AccountMenu user={userData} />
      </MemoryRouter>
    </Provider>
  );

  const dropdownToggle = screen.getByTestId("profile-dropdown");

  expect(dropdownToggle.textContent).toBe(` ${userData.username}`);

  await user.click(dropdownToggle);

  const profileItem = screen.getByTestId("profile-item");
  const logoutItem = screen.getByTestId("logout-item");

  expect(profileItem.textContent).toBe(" Profile");
  expect(logoutItem.textContent).toBe(" Logout");
});
