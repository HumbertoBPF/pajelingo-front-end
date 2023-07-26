import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getAuthenticatedUser } from "test-utils/mocking/users";
import { renderWithProviders } from "test-utils/store";
const { default: AccountMenu } = require("../../components/AccountMenu");

it("should display two buttons when no user props is specified", () => {
  renderWithProviders(<AccountMenu />);

  const signUpButton = screen.getByTestId("signup-button");
  expect(signUpButton).toBeInTheDocument();
  expect(signUpButton).toHaveTextContent("Sign up");
  expect(signUpButton).toHaveClass("btn-success");

  const signInButton = screen.getByTestId("signin-button");
  expect(signInButton).toBeInTheDocument();
  expect(signInButton).toHaveTextContent("Sign in");
  expect(signInButton).toHaveClass("btn-primary");
});

it("should display user profile dropdown when user props is specified", async () => {
  const user = userEvent.setup();

  const userData = getAuthenticatedUser();

  renderWithProviders(<AccountMenu user={userData} />);

  const dropdownToggle = screen.getByTestId("profile-dropdown");
  expect(dropdownToggle).toHaveTextContent(userData.username);

  await user.click(dropdownToggle);

  const profileItem = screen.getByTestId("profile-item");
  expect(profileItem).toBeInTheDocument();
  expect(profileItem).toHaveTextContent("Profile");

  const logoutItem = screen.getByTestId("logout-item");
  expect(logoutItem).toBeInTheDocument();
  expect(logoutItem).toHaveTextContent("Logout");
});
