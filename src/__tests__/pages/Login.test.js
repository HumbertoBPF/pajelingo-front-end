const { screen, within } = require("@testing-library/react");
const { default: Login } = require("pages/Login");
const { renderWithProviders } = require("utils/test-utils");
import userEvent from "@testing-library/user-event";
import { login } from "api/user";

jest.mock("api/user", () => {
  return {
    login: jest.fn()
  };
});

it("should display the login form", () => {
  renderWithProviders(<Login />);

  const usernameField = screen.getByTestId("username-input");
  expect(usernameField).toBeInTheDocument();
  const usernameInput = within(usernameField).getByPlaceholderText("Username");
  expect(usernameInput).toHaveAttribute("type", "text");
  expect(usernameInput).toBeRequired();

  const passwordField = screen.getByTestId("password-input");
  expect(passwordField).toBeInTheDocument();
  const passwordInput = within(passwordField).getByPlaceholderText("Password");
  expect(passwordInput).toHaveAttribute("type", "password");
  expect(passwordInput).toBeRequired();

  const linkForgotPassword = screen.getByTestId("link-forgot-password");
  expect(linkForgotPassword).toBeInTheDocument();
  expect(linkForgotPassword).toHaveTextContent("I forgot my username/password");

  const submitButton = screen.getByTestId("login-button");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toHaveTextContent("Sign in");
});

it("should call login API when the form is submitted", async () => {
  const user = userEvent.setup();

  renderWithProviders(<Login />);

  const usernameField = screen.getByTestId("username-input");
  const usernameInput = within(usernameField).getByPlaceholderText("Username");
  const passwordField = screen.getByTestId("password-input");
  const passwordInput = within(passwordField).getByPlaceholderText("Password");
  const submitButton = screen.getByTestId("login-button");

  await user.type(usernameInput, "HumbertoBPF");
  await user.type(passwordInput, "str0ng-p4sSw0rd");
  await user.click(submitButton);

  expect(login).toBeCalledTimes(1);
  expect(login).toBeCalledWith(
    "HumbertoBPF",
    "str0ng-p4sSw0rd",
    expect.anything(),
    expect.anything()
  );
});
