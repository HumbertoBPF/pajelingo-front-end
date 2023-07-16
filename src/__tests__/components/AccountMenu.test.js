import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "utils/test-utils";
const { default: AccountMenu } = require("../../components/AccountMenu");

it("should display two buttons when no user props is specified", () => {
  renderWithProviders(<AccountMenu />);

  const signUpButton = screen.getByTestId("signup-button");
  const signInButton = screen.getByTestId("signin-button");

  expect(signUpButton).toHaveTextContent("Sign up");
  expect(signInButton).toHaveTextContent("Sign in");
});

it("should display user profile dropdown when user props is specified", async () => {
  const user = userEvent.setup();

  const userData = {
    username: "HumbertoBPF",
    picture: null
  };

  renderWithProviders(<AccountMenu user={userData} />);

  const dropdownToggle = screen.getByTestId("profile-dropdown");

  expect(dropdownToggle).toHaveTextContent(userData.username);

  await user.click(dropdownToggle);

  const profileItem = screen.getByTestId("profile-item");
  const logoutItem = screen.getByTestId("logout-item");

  expect(profileItem).toHaveTextContent("Profile");
  expect(logoutItem).toHaveTextContent("Logout");
});
