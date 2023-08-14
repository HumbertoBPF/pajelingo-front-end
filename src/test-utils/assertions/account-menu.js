import { screen } from "@testing-library/dom";

export const assertUnauthenticatedAccountMenu = () => {
  const signUpButton = screen.getByTestId("signup-button");
  expect(signUpButton).toBeInTheDocument();
  expect(signUpButton).toHaveTextContent("Sign up");
  expect(signUpButton).toHaveClass("btn-success");

  const signInButton = screen.getByTestId("signin-button");
  expect(signInButton).toBeInTheDocument();
  expect(signInButton).toHaveTextContent("Sign in");
  expect(signInButton).toHaveClass("btn-primary");
};

export const assertAuthenticatedAccountMenu = () => {
  const profileItem = screen.getByTestId("profile-item");
  expect(profileItem).toBeInTheDocument();
  expect(profileItem).toHaveTextContent("Profile");

  const logoutItem = screen.getByTestId("logout-item");
  expect(logoutItem).toBeInTheDocument();
  expect(logoutItem).toHaveTextContent("Logout");
};
