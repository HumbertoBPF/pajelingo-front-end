import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "utils/test-utils";
const { default: AccountMenu } = require("../../components/AccountMenu");

it("should display two buttons when no user props is specified", () => {
  renderWithProviders(<AccountMenu />);

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

  renderWithProviders(<AccountMenu user={userData} />);

  const dropdownToggle = screen.getByTestId("profile-dropdown");

  expect(dropdownToggle.textContent).toBe(` ${userData.username}`);

  await user.click(dropdownToggle);

  const profileItem = screen.getByTestId("profile-item");
  const logoutItem = screen.getByTestId("logout-item");

  expect(profileItem.textContent).toBe(" Profile");
  expect(logoutItem.textContent).toBe(" Logout");
});
